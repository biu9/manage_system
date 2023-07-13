import os.path as osp
import json

files = ["护理员问卷%s.json" % i for i in ["A", "B", "C", "D"]]
map_id = {}
map_name = []

ID = 0


def update_q(q):
    global ID
    global map_name
    if "type" in q:
        map_id[str(q["id"])] = str(ID)
        q["id"] = str(ID)
        map_name.append(q["displayId"])
        ID += 1
    if "questions" in q:
        for qq in q["questions"]:
            update_q(qq)


def update_id(q):
    global ID
    global map_id
    if "choices" in q:
        for c in q["choices"]:
            if "hide_qs" in c:
                c["hide_qs"] = [map_id[s] for s in c["hide_qs"]]
    if "questions" in q:
        for qq in q["questions"]:
            update_id(qq)


for file in files:
    obj = json.load(open(file, "r", encoding="utf-8"))
    update_q(obj)
    print(map_id)
    update_id(obj)
    json.dump(obj, open(file, "w", encoding="utf-8"), indent=2, ensure_ascii=False)

json.dump(map_name, open("disp.json", "w", encoding="utf-8"), indent=2, ensure_ascii=False)
