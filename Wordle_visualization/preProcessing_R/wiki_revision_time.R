d<-read.csv("timeSeries_wiki.csv")
d$date<-as.numeric(as.character(d$date))
for(i in 1:nrow(d)){
    
    d$date[i]<-floor(d$date[i]/100)
}

u=1
temp<-data.frame()
g<-unique(d$date)

for(i in unique(d$date)){
    if(!is.na(i)){
    temp[u,1]<-i
     s<-subset(d, d$date==i)
     l<-nrow(s)
    for(k in 2:101){
      temp[u,k]<-0}
     
    for(j in 1:l){

         for(k in 2:101){
             temp[u,k]<-temp[u,k]+s[j,k]
         }
     }
     u=u+1
     print(u)
    }
}

words<-read.csv("wiki_data_bubble.csv")

names(temp)<-c("date",as.character(words[,1]))
write.csv(temp, file="wiki_timeSeries_byMonth.csv", row.names = FALSE)
