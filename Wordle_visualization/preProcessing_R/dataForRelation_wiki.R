
library(readr)
library(gtools)
data_wiki<-as.data.frame(read_tsv("huffington.tsv"))
wiki_words<-read.csv("huffingtonfreq.csv")


m<-matrix(ncol = 401, nrow = nrow(data_wiki))
for(i in 1:nrow(data_wiki)){
    print(i)
    m[i,1]<-data_wiki[i,2]
    for(j in seq(3,6)){
        a<-as.character(data_wiki[i,j])
        g<-unlist(strsplit(a,split="[|]|[ ]|//|\\t|\\n"))
        
        for(k in 1:100){
            w<-as.character(wiki_words[k,1])
            size<-length(which(g%in%w))
            m[i,(k+(j-3)*100+1)]<-size
        }
    }
        
}
    
    
n<-as.data.frame(m)
n<-n[,-c(1)]

relation<-matrix(ncol=100,nrow = 100)

for(i in 1:100){
    for(j in 1:100){
        relation[i,j]<-0
    }
}

for(i in 1:nrow(n)){
    for(j in 1:4){
        tem<-vector()
        temp<-n[i,((j-1)*100+1):(j*100)]
        l<-unique(which(temp!=0))
        if(length(l)>1){
           
                p<-permutations(n=length(l),r=2,v=l)
                l2<-nrow(p)
                for(e in 1:l2){
                    relation[p[e,1],p[e,2]]<-relation[p[e,1],p[e,2]]+1
                }
            
        }
    }
    print(i)
}
relation<-as.data.frame(relation)
names(relation)<-as.character(1:100)
write.csv(relation, file="sara_huff_data_relation.csv")