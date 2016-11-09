data_huff<-read.delim("huffington.tsv", sep = "\t",header = TRUE,stringsAsFactors=FALSE,strip.white=TRUE)

g<-vector()
for(i in seq(3,6)){
    a<-as.character(data_huff[,i])
    g<-c(g,unlist(strsplit(a,split="[|]|[ ]|//|\\t|\\n")))
}

t<-as.data.frame(table(as.factor(g)))
s<-t[order(-t$Freq),]
s<-s[-c(1,2,7,16,40,49,72,92,98),]
s<-s[-c(1),]
huff_data_bubble<-head(s,100)

names(huff_data_bubble)<-c("word","frequency")

write.csv(huff_data_bubble,file="huff_data_bubble.csv", row.names = F)