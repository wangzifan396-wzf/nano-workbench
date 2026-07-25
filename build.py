# -*- coding: utf-8 -*-
"""把 template.html 产出单文件 index.html（nano-workbench 纯原生，无第三方库）。"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
tpl = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
out = tpl
with open(os.path.join(HERE, "index.html"), "w", encoding="utf-8") as f:
    f.write(out)
print("built index.html bytes:", len(out.encode("utf-8")))
assert "/*__MERMAID_LIB__*/" not in out, "unexpected placeholder!"
print("OK: single-file index.html produced")
