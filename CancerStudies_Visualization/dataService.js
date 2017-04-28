var dataService = function () {
    var httpService = function () {
        var obj = {};
        obj.getData = function (url, responseType) {
            // Promises example from https://github.com/mdn/promises-test/blob/gh-pages/index.html
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("GET", url);
                request.responseType = responseType;
                // When the request loads, check whether it was successful
                request.onload = function () {
                    if (request.status === 200) {
                        // If successful, resolve the promise by passing back the request response
                        resolve(request.response);
                    } else {
                        // If it fails, reject the promise with a error message
                        reject(Error('Data didn\'t load successfully; error code:' + request.statusText));
                    }
                };
                request.onerror = function () {
                    // Also deal with the case when the entire request fails to begin with
                    // This is probably a network error, so reject the promise with an appropriate message
                    reject(Error('There was a network error.'));
                };
                // Send the request
                request.send();
            })
        };
        return obj;
    };

    var cBioPortalService = function () {
        var obj = {};
        obj.getData = function (queryString) {
            var parseData = function (data) {
                return Papa.parse(data, {
                    "header": "true",
                    "delimiter": "\t",
                    "comments": "#"
                }).data;
            }

            var url = "http://www.cbioportal.org/webservice.do?" + queryString;

            return httpService().getData(url, "text")
                .then(function (response) {
                    return parseData(response);
                });
        }
        return obj;
    };

    var typesOfCancerService = function () {
        return {
            getData: function () {
                var queryString = "cmd=getTypesOfCancer";
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var cancerStudiesService = function () {
        return {
            getData: function () {
                var queryString = "cmd=getCancerStudies";
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var geneticProfilesService = function () {
        return {
            getData: function (cancerStudyId) {
                var queryString = "cmd=getGeneticProfiles&cancer_study_id=" + cancerStudyId;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var caseListsService = function () {
        return {
            getData: function (cancerStudyId) {
                var queryString = "cmd=getCaseLists&cancer_study_id=" + cancerStudyId;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var profileDataService = function () {
        return {
            getData: function (caseSetId, geneticProfileId, geneList) {
                var queryString = "cmd=getProfileData&case_set_id=" + caseSetId
                    + "&genetic_profile_id=" + geneticProfileId
                    + "&gene_list=" + geneList;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var extendedMutationDataService = function () {
        return {
            getData: function (caseSetId, geneticProfileId, geneList) {
                var queryString = "cmd=getMutationData&case_set_id=" + caseSetId
                    + "&genetic_profile_id=" + geneticProfileId
                    + "&gene_list=" + geneList;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var clinicalDataService = function () {
        return {
            getData: function (caseSetId) {
                var queryString = "cmd=getClinicalData&case_set_id=" + caseSetId;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var proteinArrayInfoService = function () {
        return {
            getData: function (cancerStudyId, proteinArrayType, geneList) {
                var queryString = "cmd=getProteinArrayInfo&cancer_study_id=" + cancerStudyId
                    + "&protein_array_type=" + proteinArrayType
                    + "&gene_list=" + geneList;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var proteinArrayDataService = function () {
        return {
            getData: function (caseSetId, arrayInfo) {
                var queryString = "cmd=getProteinArrayData&case_set_id=" + caseSetId
                    + "&array_info=" + arrayInfo;
                return cBioPortalService().getData(queryString);
            }
        };
    };

    var geneFileService = function () {
        return {
            getData: function () {
                return httpService().getData("data/genes.json", "json");
            }
        };
    };


    var mutExFileService = function () {
        return {
            getData: function () {
                return httpService().getData("data/mutEx.json", "json");
            }
        };
    };

    var allExtendedMutationDataService = function () {
        return {
            getData: function (studyIds, geneList) {
                var promises = [];
                studyIds.forEach(function (studyId) {
                    var caseSetId = studyId + "_all";
                    var geneticProfileId = studyId + "_mutations";
                    var promise = extendedMutationDataService().getData(caseSetId, geneticProfileId, geneList);
                    promises.push(promise);
                });
                return promises;
            }
        };
    };

    var allClinicalDataService = function () {
        return {
            getData: function (studyIds) {
                var promises = [];
                studyIds.forEach(function (studyId) {
                    var caseSetId = studyId + "_all";
                    var promise = clinicalDataService().getData(caseSetId);
                    promises.push(promise);
                });
                return promises;
            }
        };
    };

    return {
        getTypesOfCancer: typesOfCancerService().getData,
        getCancerStudies: cancerStudiesService().getData,
        getGeneticProfiles: geneticProfilesService().getData,
        getCaseListsData: caseListsService().getData,
        getProfileData: profileDataService().getData,
        getExtendedMutationData: extendedMutationDataService().getData,
        getClinicalData: clinicalDataService().getData,
        getProteinArrayInfo: proteinArrayInfoService().getData,
        getProteinArrayData: proteinArrayDataService().getData,
        getGeneList: geneFileService().getData,
        getMutExData: mutExFileService().getData,
        getAllExtendedMutationData: allExtendedMutationDataService().getData,
        getAllClinicalData: allClinicalDataService().getData
    };
};

