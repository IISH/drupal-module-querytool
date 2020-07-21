# drupal-module-querytool
This module provides an interface for researchers who want to request a specific dataset.
They can build a query to compose a dataset based on datatype, classification type, year, region and multiple indicators.

version 1.1

# Installation
- enable modules Querytool, Querytool Topics and Topics Taxonomy
- set permissions for Topics Taxonomy for those who must be able to administrate terms, at: /admin/people/permissions (see section 'Taxonomy', terms type: topics)
- browse to /admin/config/system/querytool
    - define base url of API  (for example: http://data.sandbox.socialhistoryservices.org/service/)
    - define API import url for topics (for example: http://data.sandbox.socialhistoryservices.org/service/topics)
    - check confirm mode if desired
    - add a copyright notice
- enable Taxonomy translation module: /admin/modules
- set multilangual options: /admin/structure/taxonomy/topics/edit choose "Translate. Different terms will be allowed for each language and they can be translated."
- set proper position of topics page in menu: /admin/structure/menu/manage/navigation
- import topics at /admin/config/system/querytool/import
- add / change topics in topics taxonomy: /admin/structure/taxonomy/topics or at: /admin/edit-topics (edit multiple topics at once)
- disable, as desired, topics by selecting the "disable" checkbox for each topic and language, this will make the topic unclickable
- browse to /topics page to see the topics that opens up the tool
- position the Documentation block 'Data topics with documentation links.' as desired: /admin/structure/block

# Todo

None yet.

# Filename matching patterns for documentation

Documentation files wil be loaded from the API.

Block with general documentation will match files with the name containing  one of these strings:
"Introduction", "regions", "GovReports", "Classification" (But not "Modern_Classification")
Files wile appear in this order.

Blocks with documentation per topic will match files containing the datatype main number, followed by a dash and two zeroes ( x_00 ):
For example "somename_1_00_language-code.pdf" appears at topic with datatype 1. 

Every file should have the language shortname: "EN" for English or "RUS" for Russian.




           
     