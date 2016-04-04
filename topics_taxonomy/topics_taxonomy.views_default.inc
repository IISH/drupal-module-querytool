<?php
/**
 * @file
 * topics_taxonomy.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function topics_taxonomy_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'edit_topics';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Edit topics';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Edit topics';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'name' => 'name',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = 'If you want to enable/disable multiple topics at once:
1) select the topics
2) Choose operation: modify entity values
3) Press \'execute\'
4) check or uncheck \'Enable\'
5) check or uncheck the second \'Enable\' 
';
  $handler->display->display_options['header']['area']['format'] = 'filtered_html';
  /* Field: Bulk operations: Taxonomy term */
  $handler->display->display_options['fields']['views_bulk_operations']['id'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['views_bulk_operations']['field'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['display_type'] = '0';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['enable_select_all_pages'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['row_clickable'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['force_single'] = 0;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['entity_load_capacity'] = '10';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_operations'] = array(
    'action::views_bulk_operations_modify_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'show_all_tokens' => 1,
        'display_values' => array(
          '_all_' => '_all_',
        ),
      ),
    ),
  );
  /* Field: Taxonomy term: Datatype */
  $handler->display->display_options['fields']['field_datatype']['id'] = 'field_datatype';
  $handler->display->display_options['fields']['field_datatype']['table'] = 'field_data_field_datatype';
  $handler->display->display_options['fields']['field_datatype']['field'] = 'field_datatype';
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['link_to_taxonomy'] = TRUE;
  /* Field: Taxonomy term: Enable */
  $handler->display->display_options['fields']['field_enable']['id'] = 'field_enable';
  $handler->display->display_options['fields']['field_enable']['table'] = 'field_data_field_enable';
  $handler->display->display_options['fields']['field_enable']['field'] = 'field_enable';
  $handler->display->display_options['fields']['field_enable']['label'] = 'Enable (1=yes)';
  /* Sort criterion: Taxonomy term: Datatype (field_datatype) */
  $handler->display->display_options['sorts']['field_datatype_value']['id'] = 'field_datatype_value';
  $handler->display->display_options['sorts']['field_datatype_value']['table'] = 'field_data_field_datatype';
  $handler->display->display_options['sorts']['field_datatype_value']['field'] = 'field_datatype_value';
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'topics' => 'topics',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'admin/edit-topics';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Edit Topics';
  $handler->display->display_options['menu']['weight'] = '99';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;
  $translatables['edit_topics'] = array(
    t('Master'),
    t('Edit topics'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('If you want to enable/disable multiple topics at once:
1) select the topics
2) Choose operation: modify entity values
3) Press \'execute\'
4) check or uncheck \'Enable\'
5) check or uncheck the second \'Enable\' 
'),
    t('Taxonomy term'),
    t('- Choose an operation -'),
    t('Datatype'),
    t('Name'),
    t('Enable (1=yes)'),
    t('Page'),
  );
  $export['edit_topics'] = $view;

  return $export;
}
