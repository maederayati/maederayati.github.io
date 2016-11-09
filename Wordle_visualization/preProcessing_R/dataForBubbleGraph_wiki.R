
data_wiki<-read.delim("wikinews.tsv", sep = "\t",header = TRUE,stringsAsFactors=FALSE,strip.white=TRUE)

g<-vector()
for(i in seq(3,6)){
    a<-as.character(data_wiki[,i])
    g<-c(g,unlist(strsplit(a,split="[|]|[ ]|//|\\t|\\n")))
}

t<-as.data.frame(table(as.factor(g)))
s<-t[order(-t$Freq),]
s<-s[-c(1,3,5,78),]
s<-s[-c(97,98,99),]
s<-s[-c(1,2),]
s<-s[-c(2,11),]
wiki_data_bubble<-head(s,100)
names(wiki_data_bubble)<-c("word","frequency")

write.csv(wiki_data_bubble,file="wiki_data_bubble.csv", row.names = F)

