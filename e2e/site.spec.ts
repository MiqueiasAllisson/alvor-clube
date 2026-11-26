import { expect, test, type ConsoleMessage } from "@playwright/test";

test.describe("Alvor Clube", () => {
  let erros: string[];

  test.beforeEach(async ({ page }) => {
    erros = [];
    page.on("console", (m: ConsoleMessage) => m.type() === "error" && erros.push(m.text()));
    page.on("pageerror", (e) => erros.push(e.message));
    await page.goto("./");
  });

  test("carrega sem erros no console e sem rolagem horizontal", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Clube de treino em Moinhos de Vento");
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
    });
    const larguras = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, vw: window.innerWidth }));
    expect(larguras.doc).toBeLessThanOrEqual(larguras.vw);
    expect(erros).toEqual([]);
  });

  test("todas as imagens e o vídeo carregam", async ({ page }) => {
    await page.evaluate(() => document.querySelectorAll("img").forEach((i) => (i.loading = "eager")));
    await page.waitForLoadState("networkidle");
    const quebradas = await page.evaluate(() =>
      [...document.querySelectorAll("img")].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
    );
    expect(quebradas).toEqual([]);
    const video = await page.evaluate(async () => {
      const v = document.querySelector("video")!;
      const r = await fetch(v.currentSrc || v.src, { method: "HEAD" });
      return r.status;
    });
    expect(video).toBe(200);
  });

  test("modalidades acompanham a rolagem, descendo e subindo", async ({ page, isMobile }) => {
    test.skip(isMobile || (page.viewportSize()?.width ?? 0) <= 1024, "No celular e no tablet as modalidades viram cartões.");
    const itens = page.locator(".mx-item");
    const contador = page.locator(".mx-count span").last();
    for (let i = 0; i < 5; i++) {
      await itens.nth(i).evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5 + 10));
      await expect(contador).toHaveText(`0${i + 1} de 05`);
    }
    for (let i = 3; i >= 0; i--) {
      await itens.nth(i).evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5 + 10));
      await expect(contador).toHaveText(`0${i + 1} de 05`);
    }
  });

  test("grade de aulas filtra por dia e tipo", async ({ page }) => {
    const grade = page.locator("#horarios");
    await grade.getByRole("button", { name: "Ter", exact: true }).click();
    await grade.getByRole("button", { name: "Lutas" }).click();
    await expect(grade.locator("tbody tr")).toHaveCount(2);
    await grade.getByRole("button", { name: "Dom", exact: true }).click();
    await expect(grade.getByText("Domingo não tem aula coletiva")).toBeVisible();
  });

  test("formulário mostra erros e envia quando está certo", async ({ page }) => {
    const form = page.locator("#agendar form");
    await form.getByRole("button", { name: "Agendar aula experimental" }).click();
    await expect(form.getByRole("alert")).toContainText("Falta corrigir 7 campos");
    await expect(page.locator("#f-nome")).toBeFocused();

    await page.fill("#f-nome", "Ana Souza");
    await page.fill("#f-email", "ana@exemplo.com.br");
    await page.fill("#f-cel", "51999990000");
    await expect(page.locator("#f-cel")).toHaveValue("(51) 99999-0000");
    await page.selectOption("#f-mod", "funcional");
    await page.selectOption("#f-dia", "seg");
    await page.selectOption("#f-hora", "06:00");
    await page.check("#f-aceite");
    await form.getByRole("button", { name: "Agendar aula experimental" }).click();

    await expect(page.getByRole("status").filter({ hasText: "Pedido enviado" })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Funcional e HIIT, segunda às 6h.")).toBeVisible();
  });

  test("menu do celular abre e fecha", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) > 1024, "Só aparece até 1024px.");
    const botao = page.getByRole("button", { name: "Abrir menu" });
    await botao.click();
    await expect(page.locator("#menu-cel")).toBeVisible();
    await page.locator("#menu-cel").getByRole("link", { name: "Planos" }).click();
    await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
  });

  test("captura da página para comparação", async ({ page }, info) => {
    await page.evaluate(() => document.querySelectorAll("img").forEach((i) => (i.loading = "eager")));
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `test-results/shots/${info.project.name}.png`, fullPage: true });
  });
});
