import string
import json

def readLines(path, linesToSkip=0, commentChars=['#']):
    lines = []
    fin = open(path)
    i = 0
    for line in fin:
        i+=1
        if i <= linesToSkip or line[0] in commentChars:
            continue
        newLine = line.strip()
        lines.append(newLine)
    return lines

def parseIntoEntries(lines, source):
    entries = []
    for line in lines:
        entry = {}
        current = line.split("\t")
        entry["source"] = source
        entry["geneA"] = current[0]
        entry["geneB"] = current[1]
        entry["pValue"] = current[2]
        entry["logOddsRatio"] = current[3]
        entry["association"] = current[4]
        entries.append(entry)
    return entries

def parseFile(path, source, linesToSkip=0, commentChars=['#']):
    lines = readLines(path, linesToSkip)
    entries = parseIntoEntries(lines, source)
    return entries

def convertToJson(toPath, fromPathList, linesToSkip=0, commentChars=['#']):
    data = []
    for fromPath in fromPathList:
        source = fromPath.split("/")[1].split(".")[0].split(" ")[1]
        entries = parseFile(fromPath, source, linesToSkip, commentChars)
        data = data + entries
    with open(toPath, "w") as out:
        json.dump(data, out, sort_keys=True, separators=(',',':'), ensure_ascii=False, indent=2)

if __name__ == '__main__':
    convertToJson("../mutEx.json", 
        ["../mutex_result skcm_broad.txt", "../mutex_result skcm_broad_dfarber.txt", "../mutex_result skcm_tcga.txt", "../mutex_result skcm_yale.txt"], 1)
