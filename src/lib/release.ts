// Verified against GitHub Release v0.1.0 and the public Marketplace listing on 2026-10-27.
export const releaseVersion = "0.1.0";
export const releaseUrl = "https://github.com/acstride-labs/codeforces-workbench/releases/tag/v0.1.0";
export const assetBase = "https://github.com/acstride-labs/codeforces-workbench/releases/download/v0.1.0";
export const marketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=acstride.codeforces-workbench";
export const releaseTargets = ["win32-x64", "linux-x64", "darwin-x64", "darwin-arm64"] as const;
export const releaseDownloads = releaseTargets.map(target => `${assetBase}/codeforces-workbench-${releaseVersion}-${target}.vsix`);
export const checksumsUrl = `${assetBase}/SHA256SUMS`;
