{
  description = "Nix flakes for development";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    pkgs = import nixpkgs {
      system = "x86_64-linux";
      config.allowUnfree = true;
    };

    pnpm = pkgs.stdenv.mkDerivation {
      pname = "pnpm";
      version = "10.28.2";
      src = pkgs.fetchurl {
        url = "https://github.com/pnpm/pnpm/releases/download/v10.28.2/pnpm-linux-x64";
        sha256 = "sha256-nzg5b2YM07H3HgsK8Le6It0f1EbcN4QKG2oCWGhVc5A=";
      };
      dontUnpack = true;
      dontPatchELF = true;
      dontStrip = true;
      installPhase = "install -Dm755 $src $out/bin/pnpm";
    };
  in {
    devShells.x86_64-linux.default = pkgs.mkShellNoCC {
      packages = with pkgs; [
        just
        nodejs_24
        pnpm
      ];
    };
  };
}

