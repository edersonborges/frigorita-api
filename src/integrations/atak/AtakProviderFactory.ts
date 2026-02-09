import { AtakProvider } from "./AtakProvider";
import { MockAtakProvider } from "./mock/MockAtakProvider";

// Futuro: quando você tiver a URL real e quiser bater nela
// import { HttpAtakProvider } from "./http/HttpAtakProvider";

export function makeAtakProvider(): AtakProvider {
  const mode = process.env.ATAK_PROVIDER_MODE?.toLowerCase() ?? "mock";

  if (mode === "mock") return new MockAtakProvider();

  // return new HttpAtakProvider({
  //   baseUrl: process.env.ATAK_BASE_URL!,
  //   token: process.env.ATAK_TOKEN!,
  // });

  // fallback seguro:
  return new MockAtakProvider();
}
