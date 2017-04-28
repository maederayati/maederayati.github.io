(function () {
    var studyIds = ["skcm_yale", "skcm_tcga", "skcm_broad", "skcm_broad_dfarber"];
    var geneList = "CFTR,TG,TLR7,GPRC6A,TP53,GLI2,NOD2,TPO,TLR3,APC,MARCO,FGF9,E2F1,CIITA,GC,ABCA1,PLA2G3";

    var onError = function (reason) {
        var thisError = "Error";
    };

    var onGetCancerStudiesComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#cancerStudies").on("click", function () {
        dataService().getCancerStudies().then(onGetCancerStudiesComplete, onError);
    });

    var onGetGeneListComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#geneList").on("click", function () {
        dataService().getGeneList().then(onGetGeneListComplete, onError);
    });

    var onGetMutExDataComplete = function (data) {
        data.forEach(function (datum) {
            console.log(datum);
        });
    };

    $("#mutExData").on("click", function () {
        dataService().getMutExData().then(onGetMutExDataComplete, onError);
    });



    var onGetAllExtendedMutationDataComplete = function (valueArrays) {


        var results = [];
        valueArrays.forEach(function (valueArray) {
            results = results.concat(valueArray);
        })

        debugger;
        //it restore #mutated of genes in different studies
        var freqGenes = {}
        var patientList = {}
        var entrezCode = {}
        var startPos = {}
        

        var geneName = document.getElementById('search').value;

        for(var i = 0 ; i <= selected; i++){
            freqGenes[i] = valueArrays[i].filter(Boolean).reduce(function(freq, x) {
             if(x.gene_symbol == geneName){
                  freq[x.gene_symbol] = ++freq[x.gene_symbol] || 1;}
              return freq;
            },{})
            patientList[i] = valueArrays[i].filter(Boolean).reduce(function(pList, x) {
              if(x.gene_symbol == geneName){
                if(pList[x.gene_symbol] == undefined){
                    pList[x.gene_symbol] = [];
                    pList[x.gene_symbol].push(x["case_id"]);}
                else
                    pList[x.gene_symbol].push(x["case_id"]);
                }
              return pList;
            },{})
            entrezCode[i] = valueArrays[i].filter(Boolean).reduce(function(entrezId, x) {
                 if(x.gene_symbol == geneName){
                  entrezId[x.gene_symbol] = x["entrez_gene_id"];}
              return entrezId;
            },{})
            var startList = [];
            var j = 1;
            startPos[i] = valueArrays[i].filter(Boolean).reduce(function(start, x) {
              if(x.gene_symbol == geneName)
                if(start[x.gene_symbol] == undefined){
                  debugger;
                  var startData = {};
                  startData.patientId = 1;
                  startData.startPostion = x["start_position"];
                  startData.endPostion = x["end_position"];
                  startList.push(startData);
                }
              return startList;
            },{})
        }
    

        var studyIds = ["Skin Cutaneous Melanoma (Yale, Nat Genet 2012)", "Skin Cutaneous Melanoma (TCGA, Provisional)", "Skin Cutaneous Melanoma (Broad, Cell 2012)", "Melanoma (Broad/Dana Farber, Nature 2012)"];
        var allStudies = {};
         for(var i = 0 ; i < 4 ; i++){
            allStudies[i] = valueArrays[i].filter(Boolean).reduce(function(freq, x) {
             if(x.gene_symbol == geneName){
                  freq[x.gene_symbol] = ++freq[x.gene_symbol] || 1;}
              return freq;
            },{})
          }
        var freqInStudy = [];
        for(var studyId in allStudies){
            var freqData = {};
            freqData.label = studyIds[studyId];
            freqData.value = ((allStudies[studyId][geneName]/valueArrays[studyId].length).toFixed(2))*100;
            freqInStudy.push(freqData);
        }

        var w = 150;
        var h = 150;
        var r = h/2;
        var aColor = ["#FFCDD2","#EF9A9A","#E57373","#EF5350"]
        

        
        var vis = d3.select('#chart').append("svg:svg").attr("id","pieChart").data([freqInStudy]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

        var pie = d3.layout.pie().value(function(d){return d.value;});

        // Declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // Select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
        arcs.append("svg:path")
            .attr("fill", function(d, i){return aColor[i];})
            .attr("d", function (d) {return arc(d);})
        ;

     
        // Add the text
        arcs.append("svg:text")
            .attr("transform", function(d){
                d.innerRadius = 15;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";}
            )
            .attr("text-anchor", "middle")
            .text( function(d, i) {return freqInStudy[i].value + '% of ' + valueArrays[i].length;});

         arcs.on("click", function (d,i) {
          if(i == 1){
           d3.select("#tooltip")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px")
              .style("opacity", 1)
              .select("#StudyName")
              .text(studyIds[i] + " - " + freqInStudy[i].value + "%");

//             d3.select("#tooltip")
//               .style("left", d3.event.pageX + "px")
//               .style("top", d3.event.pageY + "px")
//               .style("opacity", 1)
//               .select("#Female")
//               .text(genderStat[i].FEMALE);  

//             d3.select("#tooltip")
//               .style("left", d3.event.pageX + "px")
//               .style("top", d3.event.pageY + "px")
//               .style("opacity", 1)
//               .select("#Male")
//               .text(genderStat[i].MALE);  
            }
          else {
            d3.select("#tooltip")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px")
              .style("opacity", 1)
              .select("#StudyName")
              .text(studyIds[i] + " - " + freqInStudy[i].value + "%");

//             d3.select("#tooltip")
//               .style("left", d3.event.pageX + "px")
//               .style("top", d3.event.pageY + "px")
//               .style("opacity", 1)
//               .select("#Female")
//               .text(genderStat[i].Female);  

//             d3.select("#tooltip")
//               .style("left", d3.event.pageX + "px")
//               .style("top", d3.event.pageY + "px")
//               .style("opacity", 1)
//               .select("#Male")
//               .text(genderStat[i].Male);  
            }
        })
          .on("dblclick", function () {
          d3.select("#tooltip")
              .style("opacity", 0);;
        });


        $("#geneInfo").append("<p id=geneName> Gene Name: <b>"+geneName +"</b> &nbsp;<button class=button id=test>Info</button>"+"</p>");

        $("#test").click(function(){
            window.open("https://www.ncbi.nlm.nih.gov/gene/"+entrezCode[0][geneName], "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=400");
        });

       
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 250 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category20();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var svg = d3.select("#scatter").append("svg")
            .attr("id","scatterplot")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(d3.extent(startPos[selected], function(d) { return d.patientId; })).nice();
        // x.domain([0, d3.max(startPos[selected], function(d) { return mutation[d.case_id]; })]).nice();
        y.domain(d3.extent(startPos[selected], function(d) { return d.startPostion; })).nice();

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .append("text")
              .attr("class", "textplot")
              .attr("x", width)
              .attr("y", -6)
              .style("text-anchor", "end")
               .text("Number of mutations");

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("class", "textplot")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Gene position")

          svg.selectAll(".dot")
              .data(startPos[selected])
            .enter().append("circle")
              .attr("class", "dot")
              .attr("r", 3.5)
              .attr("cx", function(d) { return x(d.patientId); })
              .attr("cy", function(d) { return y(d.startPostion); })
              .style("fill", function(d) { return "white"; })
              .append("title", function(d){ return d.case_id;});

    };


    var selectedPatient;
    var startPos = {};
    var list = [];
    var onGetAllExtendedMutationDataComplete2 = function (valueArrays) {

      //it restore #mutated of genes in different studies
      var freqGenes = {}
      var patientList = {}
      var entrezCode = {}
      
      var endPos = {}

      var geneName = document.getElementById('search').value;

      for(var i = 0 ; i <= selected; i++){
          var startList = [];
          var j = 1;
          startPos[i] = valueArrays[i].filter(Boolean).reduce(function(start, x) {
            if(x.gene_symbol == geneName)
              if(start[x.gene_symbol] == undefined){
                var startData = {};
                startData.patientId = x["case_id"];
                startData.case_id = x["case_id"];
                startData.startPostion = x["start_position"];
                startData.endPostion = x["end_position"];
                startList.push(startData);
              }
            return startList;
          },{})
      }

      list = [];      
      for( i = 0 ; i < startPos[selected].length; i++){
            list.push(startPos[selected][i].case_id);
      }

      var mutation = {};
      mutation = list.filter(Boolean).reduce(function(acc, x) {
            if(x != "" || x.includes(' ')){
                acc[x] = ++acc[x] || 1;}
            return acc;
      },{})
      
   
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 250 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.category20();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var svg = d3.select("#scatter").append("svg")
          .attr("id","scatterplot")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // x.domain(d3.extent(startPos[selected], function(d) { return mutation[d.case_id]; })).nice();
      x.domain([0, d3.max(startPos[selected], function(d) { return mutation[d.case_id]; })]);
      y.domain(d3.extent(startPos[selected], function(d) { return d.startPostion; })).nice();

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "textplot")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Number of mutations");


      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "textplot")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Gene position");



      svg.selectAll(".dot")
          .attr("id", "dotId")
          .data(startPos[selected])
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(mutation[d.case_id]); })
          .attr("cy", function(d) { return y(d.startPostion); })
          .style("fill", function(d) { return "white"; })
          .append("title")
          .text(function(d) { return d.case_id;});  
              
    };      

    $("#allExtendedMutationData").on("click", function () {
        d3.selectAll("#scatterplot").remove();
        d3.selectAll("#pieChart").remove();
        d3.selectAll("#geneName").remove();
        var promises = dataService().getAllExtendedMutationData(studyIds, geneList);
        Promise.all(promises).then(onGetAllExtendedMutationDataComplete, onError);
    });

  var genderStat = {};
  var onGetAllClinicalDataComplete = function (valueArrays) {

    for(var i = 0 ; i < 4 ; i++){
        genderStat[i] = valueArrays[i].filter(Boolean).reduce(function(freq, x) {
          // if(list.includes(x.CASE_ID))
        {  if(x.GENDER != undefined){
                    if(x.GENDER.toLowerCase()  == "female"){
                      freq[x.GENDER] = ++freq[x.GENDER] || 1;}
                    if(x.GENDER.toLowerCase()  == "male"){
                      freq[x.GENDER] = ++freq[x.GENDER] || 1;}
                  }else if(x.SEX != undefined){
                    if(x.SEX.toLowerCase()  == "female"){
                      freq[x.SEX] = ++freq[x.SEX] || 1;}
                    if(x.SEX.toLowerCase()  == "male"){
                      freq[x.SEX] = ++freq[x.SEX] || 1;}
                  }}
          return freq;
        },{})
    }
      
 
      
    var colorPatient = d3.scale.category20();  

    d3.selectAll(".dot").on("click",function(d){
       selectedPatient = d.case_id;
       brushPatient();
       d3.select(this).style("fill", "black"); 
       d3.select("#tooltipscatter")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px")
              .style("opacity", 1)
              .select("#patientID")
              .text(selectedPatient)
    });

   d3.selectAll(".dot").on("dblclick",function(d){
       selectedPatient = "";
       brushPatient();
       d3.select(this).style("fill", function(d) {return "white";});
       d3.select("#tooltipscatter").style("opacity", 0);
    });   


    var results = valueArrays[selected];
    results2=results.filter(function(d){
      if(selected==0 && (!d["AGE_AT_PROCUREMENT"] || !d["PRIMARY_SITE"] || !d["GENDER"] || !d["SPECIMEN_SITE"]) ) 
            return 0;
      if(selected==1 && (!d["VITAL_STATUS"] || !d["ETHNICITY"] || !d["GENDER"] || !d["TUMOR_SITE"]) ) 
          return 0;
      if(selected==2 && (!d["AGE_AT_PROCUREMENT"] || !d["PRIMARY_SITE"] || !d["AGE"] || !d["GENDER"] ))
          return 0;
      if(selected==3 && (!d["MEAN_PLOIDY"] || !d["PRIMARY_SITE"] || !d["AGE"] || !d["TUMOR_PURITY"] ))
          return 0;
      else 
          return 1;
    });

    var margin = {top: 30, right: 10, bottom: 10, left: 10},
        width = 460 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {},
        dragging = {};

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background;

    var svg = d3.select("#studyInfo").append("svg")
        .attr("class","pc")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

    drawGraph();

    var colorp1;
    var colorp2;

    function drawGraph(){
        var numericParam=["AGE","AGE_AT_PROCUREMENT","TUMOR_PURITY","MEAN_PLOIDY"];
        var categoricalParam=["GENDER","ETHNICITY","TUMOR_SITE","VITAL_STATUS","SPECIMEN_SITE","PRIMARY_SITE"];

        function include(arr, obj) {
            for(var i=0; i<arr.length; i++) {
                if (arr[i] === obj) return true;
            }
        }   
     
      // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = d3.keys(results2[0]).filter(function(d) {

            if(include(categoricalParam,d)) {
                y[d] = d3.scale.ordinal()
                  .domain(results2.map(function(p) { 
                    if(p[d].length>12){
                        p[d]=p[d].substring(0,10)+"..";
                    }
                     return p[d]; 

                 }))
                  .rangePoints([height, 0]);
                  return true;
            }
            
            if (include(numericParam,d)){ 
                y[d] = d3.scale.linear()
                  .domain(d3.extent(results2, function(p) {  return +p[d]; }))
                  .range([height, 0]);
                  return true;
            }
            
            else 
                return false;
        }));

        background = svg.append("g")
              .attr("class", "background")
            .selectAll("path")
              .data(results2)
            .enter().append("path")
              .attr("d", path);

        var temp=[];
        var changedParam=param.toUpperCase().replace(/\s/g,"_");
        results2.forEach(function(d){
        temp.push(d[changedParam]);

    });

           

      colorp1=d3.scale.linear().domain([d3.min(temp),d3.max(temp)]).range(["#1f77b4","#ff7f0e"]);  
      colorp2=d3.scale.category10();

    // Add blue foreground lines for focus.
      foreground = svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(results2)
      .enter().append("path")
        .attr("d", path)
      .attr("stroke",function(d)
        { 
           if(include(categoricalParam,changedParam)){
           
                return colorp2(d[changedParam]); 
           }
           else{
                return colorp1(d[changedParam]); 
           }
        });

    // Add a group element for each dimension.
      var g = svg.selectAll(".dimension")
        .data(dimensions)
      .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.behavior.drag()
          .origin(function(d) { return {x: x(d)}; })
          .on("dragstart", function(d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function(d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
          })
          .on("dragend", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            background
                .attr("d", path)
              .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
          }));

      // Add an axis and title.
      g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { 
          return d.replace(/_/g," "); 
      });

      d3.selectAll("g.axis").style("font-size","8px");
      // Add and store a brush for each axis.
      g.append("g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
        })
      .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);
    }

    function position(d) {
      var v = dragging[d];
      return v == null ? x(d) : v;
    }

    function transition(g) {
      return g.transition().duration(500);
    }

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
    }

    function brushstart() {
      d3.event.sourceEvent.stopPropagation();
    }

   
    function brushPatient() {
      var actives = dimensions.filter(function(p) { debugger; return !y[p].brush.empty(); }),
          extents = actives.map(function(p) { debugger; return y[p].brush.extent(); });
      actives.push("AGE");
      foreground.style("display", function(d) {
        return actives.every(function(p, i) {
            return selectedPatient == d.CASE_ID;
        }) ? null : "none";
      });
    }

    // Handles a brush event, toggling the display of foreground lines. 
    function brush() {
      var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
          extents = actives.map(function(p) { return y[p].brush.extent(); });
      foreground.style("display", function(d) {
        return actives.every(function(p, i) {
            return extents[i][0] <= d[p] && d[p] <= extents[i][1];
        }) ? null : "none";
      });
    }


  };

    

    $("#allClinicalData").on("change", function () {
        d3.selectAll("#scatterplot").remove();
        var promises2 = dataService().getAllExtendedMutationData(studyIds, geneList);
        Promise.all(promises2).then(onGetAllExtendedMutationDataComplete2, onError);

        d3.selectAll("svg.pc").remove();
        var promises = dataService().getAllClinicalData(studyIds);
        selected=+this.value;
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);

       if ($(this).data('options') == undefined) {
          /*Taking an array of all options-2 and kind of embedding it on the select1*/
          $(this).data('options', $('#select2 option').clone());
        }
        var id = $(this).val();
        var options = $(this).data('options').filter('[value=' + id + ']');
        $('#select2').html(options);

    });

    $("#allExtendedMutationData").on("click", function () {
        selected=0;
        d3.selectAll("svg.pc").remove();
        var promises = dataService().getAllClinicalData(studyIds);
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);
    });

    var param="Age at Procurement";
    $("#select2").on("change",function(){
             param=$('#select2').find(":selected").text();
             d3.selectAll("svg.pc").remove();
        var promises = dataService().getAllClinicalData(studyIds);
        Promise.all(promises).then(onGetAllClinicalDataComplete, onError);
    });

})();
