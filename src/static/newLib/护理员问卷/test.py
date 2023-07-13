import os.path as osp
import json

files = ["护理员问卷%s.json" % i for i in ["A", "B", "C"]]
map_id = {}
map_name = []


def update_id(q):
    if "type" in q:
        q["id"] = str(int(q["id"]) - 1)
    if "choices" in q:
        for c in q["choices"]:
            if "hide_qs" in c:
                c["hide_qs"] = [str(int(s) - 1) for s in c["hide_qs"]]
    if "questions" in q:
        for qq in q["questions"]:
            update_id(qq)


for file in files:
    obj = json.load(open(file, "r", encoding="utf-8"))
    update_id(obj)
    json.dump(obj,
              open(file, "w", encoding="utf-8"),
              indent=2,
              ensure_ascii=False)

# json.dump(map_name, open("disp.json", "w", encoding="utf-8"), indent=2, ensure_ascii=False)
