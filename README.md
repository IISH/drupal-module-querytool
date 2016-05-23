# drupal-module-querytool
This module provides an interface for researchers who want to request a specific dataset.
They can build a query to compose a dataset based on datatype, classification type, year, region and multiple indicators.

version 0.3-dev

# Installation
- enable module querytool, querytool_topics and topics_taxonomy
- set permissions for Topics Taxonomy for those who must admin these terms: /admin/people/permissions
- browse to /admin/config/system/querytool
    - define base url of API
    - define API import url for topics
- import topics at /admin/config/system/querytool/import
- add / change topics in topics taxonomy: /admin/structure/taxonomy/topics
- enable, as desired, topics by selecting the "enable" checkbox for each topic and language, this will make the topic clickable to open up the querytool
- browse to /topics
- enable Taxonomy translation module: /admin/modules
- set multilangual options: /admin/structure/taxonomy/topics/edit choose  "Translate. Different terms will be allowed for each language and they can be translated."
- set proper position of topics page in menu: /admin/structure/menu/manage/navigation

# Todo
- implement depth checkbox for level 4
