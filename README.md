# drupal-module-querytool
This module provides an interface for researchers who want to request a specific dataset.
They can build a query to compose a dataset based on datatype, classification type, year, region and multiple indicators.

version 1.0

# Installation
- enable modules Querytool, Querytool Topics and Topics Taxonomy
- set permissions for Topics Taxonomy for those who must be able to administrate terms, at: /admin/people/permissions (see section 'Taxonomy', terms type: topics)
- browse to /admin/config/system/querytool
    - define base url of API  (for example: http://data.sandbox.socialhistoryservices.org/service/)
    - define API import url for topics (for example: http://data.sandbox.socialhistoryservices.org/service/topics)
    - check confirm mode if desired
    - add a copyright notice
- import topics at /admin/config/system/querytool/import
- add / change topics in topics taxonomy: /admin/structure/taxonomy/topics or at: /admin/edit-topics (edit multiple topics at once)
- enable, as desired, topics by selecting the "enable" checkbox for each topic and language, this will make the topic clickable to open up the querytool
- browse to /topics page to see the topics that opens up the tool
- position the Documentation block 'Data topics with documentation links.' as desired: /admin/structure/block

# Todo
