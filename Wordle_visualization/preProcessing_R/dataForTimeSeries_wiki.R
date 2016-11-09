#data_wiki<-read.delim("wikinews.tsv", sep = "\t",header = TRUE,stringsAsFactors=FALSE,strip.white=TRUE)
library(readr)
data_wiki<-as.data.frame(read_tsv("wikinews.tsv"))
wiki_words<-read.csv("wiki_data_bubble.csv")


m<-matrix(ncol = 401, nrow = nrow(data_wiki))
for(i in 1:nrow(data_wiki)){
    print(i)
    m[i,1]<-as.character(data_wiki[i,2])
    for(j in seq(3,6)){
        a<-as.character(data_wiki[i,j])
        g<-unlist(strsplit(a,split="[|]|[ ]"))
        
        for(k in 1:100){
            w<-as.character(wiki_words[k,1])
            size<-length(which(g%in%w))
            m[i,(k+(j-3)*100+1)]<-size
        }
    }
        
}
    
    
n<-as.data.frame(m)

timeSeries<-data.frame()
for(i in 1:nrow(n)){
    timeSeries[i,1]<-n[i,1]
    for(j in 1:100){
        sum<-sum(as.numeric(as.character(n[i,j+1])),as.numeric(as.character(n[i,100+j+1]))
                 ,as.numeric(as.character(n[i,200+j+1])),as.numeric(as.character(n[i,300+j+1])))
        timeSeries[i,j+1]<-sum    
    }
    print(i)
}

#timeSeries[,1]<-as.Date(timeSeries[,1])
for(i in 2:101){
    timeSeries[,i]<-as.numeric(timeSeries[,i])
}

names(timeSeries)<-c("date",as.character(wiki_words[,1]))

write.csv(timeSeries, file="timeSeries_wiki.csv", row.names = FALSE)
