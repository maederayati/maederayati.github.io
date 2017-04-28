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

def parseIntoEntries(lines):
    entries = []
    for line in lines:
        entry = {}
        current = line.split("\t")
        if any(e["geneId"] == current[0] for e in entries):
            continue
        entry["geneId"] = current[0]
        entries.append(entry)
    return entries

def parseFile(path, linesToSkip=0, commentChars=['#']):
    lines = readLines(path, linesToSkip)
    entries = parseIntoEntries(lines)
    return entries

"""
Read the TSV file containing the categories of pipe-separated terms.
Convert the contents to an array of objects and write them to a JSON file.
Find the 50 most frequent terms and write them to a JSON file.
"""
def convertToJson(toPath, fromPath, linesToSkip=0, commentChars=['#']):
    data = parseFile(fromPath, linesToSkip)
    with open(toPath, "w") as out:
        json.dump(data, out, sort_keys=True, separators=(',',':'), ensure_ascii=False)

if __name__ == '__main__':
    convertToJson("../genes.json", "../data_mutations_extended.txt", 2)
