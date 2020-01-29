-- CREATE TABLE data_2015 (
-- 	country VARCHAR(40)     NOT NULL,
-- 	region VARCHAR(40),
-- 	happiness_rank FLOAT    NOT NULL,
-- 	happiness_score FLOAT   NOT NULL,
-- 	standard_error FLOAT,
-- 	economy_GDP FLOAT,
-- 	family FLOAT,
-- 	life_expectancy FLOAT,
-- 	freedom FLOAT,
-- 	trust_govt_corr FLOAT,
-- 	generosity FLOAT,
-- 	dystopis_residual FLOAT,
-- 	PRIMARY KEY (country)
-- );

-- CREATE TABLE data_2016(
-- 	country VARCHAR(40)      NOT NULL,
-- 	region VARCHAR(40),
-- 	happiness_rank FLOAT     NOT NULL,
-- 	happiness_score FLOAT    NOT NULL,
-- 	lwr_conf_interval FLOAT,
-- 	upr_conf_interval FLOAT,
-- 	economy_GDP FLOAT,
-- 	family FLOAT,
-- 	life_expectancy FLOAT,
-- 	freedom FLOAT,
-- 	trust_govt_corr FLOAT,
-- 	generosity FLOAT,
-- 	dystopia_residual FLOAT,
-- 	PRIMARY KEY(country)
-- );

-- CREATE TABLE data_2017(
-- 	country VARCHAR(40)      NOT NULL,
-- 	happiness_rank FLOAT     NOT NULL,
-- 	happiness_score FLOAT    NOT NULL,
-- 	whisker_high FLOAT,
-- 	whisker_low FLOAT,
-- 	economy_GDP FLOAT,
-- 	family FLOAT,
-- 	life_expectancy FLOAT,
-- 	freedom FLOAT,
-- 	generosity FLOAT,
-- 	trust_govt_corr FLOAT,
-- 	dystopia_residual FLOAT,
-- 	PRIMARY KEY (country)
-- );
 
-- CREATE TABLE data_2018(
-- 	overall_rank INT             NOT NULL,
-- 	country VARCHAR(40)          NOT NULL,
-- 	score FLOAT                  NOT NULL,
-- 	GDP_per_capita FLOAT,
-- 	social_support FLOAT,
-- 	life_expectancy FLOAT,
-- 	freedom FLOAT,
-- 	generosity FLOAT,
-- 	perception_corr FLOAT,
-- 	PRIMARY KEY(country)
-- );

  CREATE TABLE data_2019(
  	country VARCHAR(40)             NOT NULL,
  	happiness_rank FLOAT            NOT NULL,
  	happiness_score FLOAT           NOT NULL,
  	gdp_per_capita FLOAT,
  	social_support FLOAT,
  	life_expectancy FLOAT,
  	freedom FLOAT,
  	generosity FLOAT,
 	government_corr FLOAT,
 	PRIMARY KEY (country)
 );






-- SELECT data_2015.*, data_2016.*, data_2017.*, data_2018.*, data_2019.*
-- FROM data_2015
-- 	FULL OUTER JOIN data_2016 
-- 		ON data_2015.country=data_2016.country
-- 	FULL OUTER JOIN data_2017 
-- 		ON data_2016.country=data_2017.country
-- 	FULL OUTER JOIN data_2018 
--  		ON data_2017.country=data_2018.country
--  	FULL OUTER JOIN data_2019 
--  		ON data_2018.country=data_2019.country	
-- ORDER BY data_2015.country;






