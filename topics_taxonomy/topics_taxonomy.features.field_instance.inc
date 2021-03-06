<?php
/**
 * @file
 * topics_taxonomy.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function topics_taxonomy_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'taxonomy_term-topics-field_datatype'.
  $field_instances['taxonomy_term-topics-field_datatype'] = array(
    'bundle' => 'topics',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 3,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_datatype',
    'label' => 'Datatype',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'size' => 5,
      ),
      'type' => 'text_textfield',
      'weight' => 3,
    ),
  );

  // Exported field_instance: 'taxonomy_term-topics-field_documentation'.
  $field_instances['taxonomy_term-topics-field_documentation'] = array(
    'bundle' => 'topics',
    'deleted' => 0,
    'description' => 'Here you can add documentation files. They will shown in the interface if the filename contains a year that is known by the API, for example "xxxxxx_1795.doc".
When a file must show up in the datacategories help popup, the filename must contain a data-category name, for example: "xxxxxx_modern.doc" (case-insensitive).',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'file',
        'settings' => array(),
        'type' => 'file_default',
        'weight' => 5,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_documentation',
    'label' => 'Documentation files',
    'required' => 0,
    'settings' => array(
      'description_field' => 0,
      'file_directory' => 'documentation',
      'file_extensions' => 'doc pdf',
      'max_filesize' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'file',
      'settings' => array(
        'progress_indicator' => 'throbber',
      ),
      'type' => 'file_generic',
      'weight' => 6,
    ),
  );

  // Exported field_instance: 'taxonomy_term-topics-field_enable'.
  $field_instances['taxonomy_term-topics-field_enable'] = array(
    'bundle' => 'topics',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => 'If enable, the user can open up the querytool from the topics page.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'list',
        'settings' => array(),
        'type' => 'list_default',
        'weight' => 4,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_enable',
    'label' => 'Enable',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 1,
    ),
  );

  // Exported field_instance: 'taxonomy_term-topics-field_root_id'.
  $field_instances['taxonomy_term-topics-field_root_id'] = array(
    'bundle' => 'topics',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'number',
        'settings' => array(
          'decimal_separator' => '.',
          'prefix_suffix' => TRUE,
          'scale' => 0,
          'thousand_separator' => ' ',
        ),
        'type' => 'number_integer',
        'weight' => 2,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_root_id',
    'label' => 'Root ID',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 5,
    ),
  );

  // Exported field_instance: 'taxonomy_term-topics-field_topic_id'.
  $field_instances['taxonomy_term-topics-field_topic_id'] = array(
    'bundle' => 'topics',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'number',
        'settings' => array(
          'decimal_separator' => '.',
          'prefix_suffix' => TRUE,
          'scale' => 0,
          'thousand_separator' => ' ',
        ),
        'type' => 'number_integer',
        'weight' => 1,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_topic_id',
    'label' => 'Topic ID',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(),
      'type' => 'number',
      'weight' => 4,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Datatype');
  t('Documentation files');
  t('Enable');
  t('Here you can add documentation files. They will shown in the interface if the filename contains a year that is known by the API, for example "xxxxxx_1795.doc".
When a file must show up in the datacategories help popup, the filename must contain a data-category name, for example: "xxxxxx_modern.doc" (case-insensitive).');
  t('If enable, the user can open up the querytool from the topics page.');
  t('Root ID');
  t('Topic ID');

  return $field_instances;
}
