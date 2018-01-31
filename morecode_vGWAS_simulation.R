
## Each list contains one set of simulated data (1000 simulations with approximately N = 
## 8000 observations in each)
## The code below applies the regression
## model to each list and stores the 
## coefficient in a data.frame

##
library(dplyr)
library(plm)
library(data.table)

## read in data

df_withZ <- readRDS("simulated_1000rep_interceptcor0.15_withsqZ.RDS")

## subset
df_withZ_subset <- df_withZ[c(1:10)]

## try data.table way of demeaning
trait_names <- grep("effect", colnames(df_withZ_subset[[1]]), 
                    value = TRUE)

## select variables to demean
## and demean by taht
to_demean <- c("sex", "age", "snp1_additive", "FID", trait_names)
df_withZ_todemean <- lapply(df_withZ_subset,
                            function(x) x[, to_demean])
df_withZ_demean <- lapply(df_withZ_todemean,
                    function(x) 
                  as.data.table(x)[, lapply(.SD, function(x) x - mean(x)), 
                            by = "FID"])


## now feed that data to all models

#### neither mean nor variance effects
squaredZreg_null_noconfound_demeaned_nocont <- do.call("rbind.data.frame", 
                               lapply(df_withZ_demean,
                            function(x){
                          summary(lm(normal_neithereffect_eithersnp_squared_zscore ~
                             snp1_additive + sex + age,
                    data = x))$coefficients["snp1_additive", c(1, 4)]
                                                              })) %>%
  mutate(outcome = "neither",
         confounding = "no",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 


squaredZreg_null_confound_demeaned_nocont <- do.call("rbind.data.frame", 
            lapply(df_withZ_demean,
                  function(x){
                  summary(lm(normal_neithereffect_eithersnp_confounded_squared_zscore ~
                    snp1_additive + sex + age,
                    data = x))$coefficients["snp1_additive", c(1, 4)]
                                                            })) %>%
  mutate(outcome = "neither",
         confounding = "yes",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 


## mean effects
squaredZreg_mean_noconfound_demeaned_nocont <- do.call("rbind.data.frame", 
                    lapply(df_withZ_demean, function(x){
                       summary(lm(normal_meaneffect_snp1_squared_zscore ~
                          snp1_additive + sex + age,
                      data = x))$coefficients["snp1_additive", c(1, 4)]
                                                              })) %>%
  mutate(outcome = "mean",
         confounding = "no",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 

squaredZreg_mean_confound_demeaned_nocont <- do.call("rbind.data.frame", 
        lapply(df_withZ_demean, function(x){
      summary(lm(normal_meaneffect_snp1_confounded_squared_zscore ~
        snp1_additive + sex + age, data = x))$coefficients["snp1_additive", c(1, 4)]
                                                     })) %>%
  mutate(outcome = "mean",
         confounding = "yes",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 

## variance effects
squaredZreg_var_noconfound_demeaned_nocont <- do.call("rbind.data.frame", 
                lapply(df_withZ_demean,
                 function(x){ summary(lm(normal_vareffect_snp1_squared_zscore ~
                      snp1_additive + sex + age,
                      data = x))$coefficients["snp1_additive", c(1, 4)]
                                                             })) %>%
  mutate(outcome = "var",
         confounding = "no",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 


squaredZreg_var_confound_demeaned_nocont <- do.call("rbind.data.frame", 
                      lapply(df_withZ_demean, function(x){
              summary(lm(normal_vareffect_snp1_confounded_squared_zscore ~
          snp1_additive + sex + age, data = x))$coefficients["snp1_additive", c(1, 4)]
                                                    })) %>%
  mutate(outcome = "var",
         confounding = "yes",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 

## both
squaredZreg_meanvar_noconfound_demeaned_nocont <- do.call("rbind.data.frame", 
            lapply(df_withZ_demean,
            function(x){
            summary(lm(normal_meanvareffect_snp1_squared_zscore ~
                snp1_additive + sex + age, data = x))$coefficients["snp1_additive", c(1, 4)]
                                                                 })) %>%
  mutate(outcome = "meanvar",
         confounding = "no",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 


squaredZreg_meanvar_confound_demeaned_nocont <- do.call("rbind.data.frame", 
               lapply(df_withZ_demean, function(x){summary(lm(normal_meanvareffect_snp1_confounded_squared_zscore ~
               snp1_additive + sex + age, data = x))$coefficients["snp1_additive", c(1, 4)]
                                                        })) %>%
  mutate(outcome = "meanvar",
         confounding = "yes",
         data = "demean",
         popstratcontrol = "no",
         sims = 1:length(df_withZ_demean)) 


## bind into a list and export

### store in a list
squaredZ_allregslist_demean <- list(squaredZreg_mean_noconfound_demeaned_nocont,
                                       squaredZreg_mean_confound_demeaned_nocont,
                                       squaredZreg_null_confound_demeaned_nocont,
                                       squaredZreg_null_noconfound_demeaned_nocont,
                                       squaredZreg_var_confound_demeaned_nocont,
                                       squaredZreg_var_noconfound_demeaned_nocont,
                                       squaredZreg_meanvar_confound_demeaned_nocont,
                                       squaredZreg_meanvar_noconfound_demeaned_nocont)

### name all list elements

squaredZ_allregs_demean_listrename <- lapply(squaredZ_allregslist_demean,
                                                setNames,
                                                c("beta", "p",
                                                  "outcome",
                                                  "confounding",
                                                  "data",
                                                  "sims")) 



## bind into a single data.frame

squaredZ_allregs_df_demean <- do.call("rbind.data.frame", 
                                         squaredZ_allregs_demean_listrename)

print("results combined")

saveRDS(squaredZ_allregs_df_demean, "squaredZ_allregs_updated1114_demean.RDS")
