data_huff<-read.delim("huffington.tsv", sep = "\t",header = TRUE,stringsAsFactors=FALSE,strip.white=TRUE)
huff_words<-read.csv("huff_data_bubble.csv")


m<-matrix(ncol = 401, nrow = nrow(data_huff))
for(i in 1:nrow(data_huff)){
    print(i)
    m[i,1]<-data_huff[i,2]
    for(j in seq(3,6)){
        a<-as.character(data_huff[i,j])
        g<-unlist(strsplit(a,split="[|]|[ ]|//|\\t|\\n"))
        
        for(k in 1:100){
            w<-as.character(huff_words[k,1])
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

timeSeries[,1]<-as.Date(timeSeries[,1])

names(timeSeries)<-c("date",as.character(huff_words[,1]))

write.csv(timeSeries, file="timeSeries_huff.csv", row.names = FALSE)
