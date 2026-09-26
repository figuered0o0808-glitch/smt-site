"""Gera os 5 assets de textura da dose cheia do site SMT.

Entrada: recorte /tmp/smtsrv/tex/papel-preto-2.png (513x419, prancha Texturas).
Saída:   ./out/  (copiar para ~/Documents/smt-site/assets/texturas/)

  papel-preto.webp    tile 900x~680, costurado por crossfade (sem espelho), q72
  papel-amarelo.webp  mesmo tile, relevo +-20 sobre #FFBC3B, q75
  grao.png            512x512 RGBA, pontinhos brancos em alfa (dente do papel)
  nevoa-roxa.webp     900x700 RGBA, dither binario #5B4585, cresce de baixo/direita
  nevoa-teal.webp     900x700 RGBA, dither binario #2C7A86, cresce de baixo/direita (404: texto fica a esquerda)

Uso: python3 gera_texturas.py   (precisa de numpy + Pillow)
"""
import os
import numpy as np
from PIL import Image

SRC = "/tmp/smtsrv/tex/papel-preto-2.png"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(2026)

def kb(p):
    return round(os.path.getsize(p) / 1024, 1)

def costura(a, faixa):
    """Tile sem emenda por crossfade: a borda direita entra por baixo da esquerda
    (e a de baixo por baixo da de cima) num degrade linear de `faixa` px."""
    h, w = a.shape
    w2 = w - faixa
    t = np.linspace(0, 1, faixa, dtype=np.float32)[None, :]
    horiz = np.empty((h, w2), np.float32)
    horiz[:, faixa:] = a[:, faixa:w2]
    horiz[:, :faixa] = t * a[:, :faixa] + (1 - t) * a[:, w2:w2 + faixa]
    h2 = h - faixa
    tv = np.linspace(0, 1, faixa, dtype=np.float32)[:, None]
    vert = np.empty((h2, w2), np.float32)
    vert[faixa:, :] = horiz[faixa:h2, :]
    vert[:faixa, :] = tv * horiz[:faixa, :] + (1 - tv) * horiz[h2:h2 + faixa, :]
    return vert

def papel_preto():
    im = Image.open(SRC).convert("L")
    a = np.asarray(im).astype(np.float32)
    a = a[:-8, :]                      # 8 linhas de fundo da prancha coladas na base
    a = (a - a.mean()) * 1.15 + 32     # media #20; pico dos vincos fica em ~#3d
    a = np.clip(a, 0, 255)
    # amplia ANTES de costurar (a emenda fica exata em 900 px)
    im = Image.fromarray(a.astype(np.uint8), "L")
    w = 900 + 180                      # 180 = faixa de crossfade em pixels finais
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    a = costura(a, 180)
    a = np.clip(a, 0, 64)              # trava o brilho: cor solida sobre o papel passa AA
    im = Image.fromarray(a.astype(np.uint8), "L")
    p = os.path.join(OUT, "papel-preto.webp")
    im.convert("RGB").save(p, "WEBP", quality=72, method=6)
    print("papel-preto.webp", im.size, kb(p), "KB")
    return a

def papel_amarelo(L):
    rel = (L - L.mean()) * 0.8          # relevo +-20 em torno do amarelo
    base = np.array([255, 188, 59], np.float32)
    rgb = np.clip(base[None, None, :] + rel[..., None], 0, 255).astype(np.uint8)
    im = Image.fromarray(rgb, "RGB")
    p = os.path.join(OUT, "papel-amarelo.webp")
    im.save(p, "WEBP", quality=75, method=6)
    esc = rgb.reshape(-1, 3)[rgb.reshape(-1, 3).sum(1).argmin()]
    print("papel-amarelo.webp", im.size, kb(p), "KB", "ponto mais escuro", tuple(int(x) for x in esc))

def grao():
    n = 512
    alpha = np.zeros((n, n), np.uint8)
    m = rng.random((n, n))
    alpha[m < 0.020] = 22
    alpha[m < 0.004] = 55
    alpha[m < 0.0006] = 110
    rgba = np.dstack([np.full((n, n), 255, np.uint8)] * 3 + [alpha])
    p = os.path.join(OUT, "grao.png")
    Image.fromarray(rgba, "RGBA").save(p, "PNG", optimize=True)
    print("grao.png", (n, n), kb(p), "KB")

def nevoa(nome, cor, lado):
    W, H = 900, 700
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    xn, yn = x / W, y / H
    if lado == "esq":
        xn = 1 - xn
    # duas lombadas, mais alta no canto (direita ou esquerda), como na prancha
    d = yn - 0.35 - 0.18 * np.sin(4.5 * xn + 1.0) - 0.08 * np.cos(11 * xn) - 0.22 * xn
    mask = np.clip(d / 0.40, 0, 1) ** 1.2          # rampa curta: nucleo solido ocupa ~30% da altura
    dots = rng.random((H, W)) < mask
    solid = mask > 0.93
    borda = np.clip((d + 0.16) / 0.16, 0, 1)      # spray so numa faixa de ~110 px acima da borda
    spray = rng.random((H, W)) < (0.035 * borda * (mask < 0.02))
    alpha = np.where(dots | solid | spray, 255, 0).astype(np.uint8)
    rgb = np.zeros((H, W, 3), np.uint8)
    rgb[...] = cor
    im = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")
    p = os.path.join(OUT, f"nevoa-{nome}.webp")
    im.save(p, "WEBP", lossless=True, method=6)
    print(f"nevoa-{nome}.webp", im.size, kb(p), "KB")

L = papel_preto()
papel_amarelo(L)
grao()
nevoa("roxa", (0x5B, 0x45, 0x85), "dir")
nevoa("teal", (0x2C, 0x7A, 0x86), "dir")
