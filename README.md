# drupal-module-querytool
This module provides an interface for researchers who want to request a specific dataset.
The can build a query to compose a dataset bases on datatype, classification type, year, region and multiple indicators.


version 0.1-dev

# Installation
- enable module querytool, querytool_topics and topics_taxonomy
- browse to /admin/config/system/querytool
    - define base url of API
    - define API import url for topics
- import topics at /admin/config/system/querytool/import
- add / change topics in topics taxonomy: /admin/structure/taxonomy/topics
- browse to /topics

- enable Taxonomy translation module
- set multilangual options: /admin/structure/taxonomy/topics/edit choose  "Translate. Different terms will be allowed for each language and they can be translated."

# Todo

- implement region translation