<div id="header">
  <img src="<?php print $logo; ?>" id="logo" alt="" class="" />
  <h1><?php print $title; ?></h1>

  <div id="langmenu">
    choose language
  </div>


  <div id="close">
    <a href="#" onclick="closeWindow();"><i class="fa fa-times"></i></a>
  </div>
</div>

<?php print $messages; ?>

<div id="mainmessage-container"></div>
<div id="qsv"></div>

<div id="main">
  <div id="classmodeselection" class="step">
    <h2><span class="stepnum"></span>Choose mode</h2>
    <div id="classmodes"></div>
  </div>

  <div id="yearselection"  class="step">
    <h2><span class="stepnum"></span>Choose year</h2>
    <div id="yearcontainer"> </div>
  </div>

  <div id="regionselection" class="step">
    <h2><span class="stepnum"></span>Choose regions</h2>
    <div id="regioncontainer"> </div>
  </div>

  <div id="topicselection" class="step">
    <a href="#" onclick="showTree();" id="show-tree"><i class="fa fa-sitemap"></i></a>
    <h2><span class="stepnum"></span>Choose topics</h2>
    <div id="topic-lists"></div>

    <div style="clear:both;"></div>
    <button id="btn-generate" type="button" class="btn btn-primary">Generate preview</button>
  </div>

  <div style="clear:both;"></div>
  <div id="result" class="step">
    <h2><span class="stepnum"></span>Result</h2>
    <input type="text" id="preview_url" style="width:90%;"/>
    <iframe id="preview" src=""></iframe>


    <button id="btn-download" type="button" class="btn btn-primary">Download</button>
  </div>
</div>

<script type="text/template" id="classmode-template">
    <% _.each(modes, function(mode) { %>
    <div class="mode">
    <input type="radio" name="classmode" id="classmode" value="<%= htmlEncode(mode.name) %>"> <label><%= htmlEncode(mode.label) %></label> - <span class="description"><%= htmlEncode(mode.description) %></span>
  </div>
    <% }); %>
</script>

<script type="text/template" id="years-template">

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
        <% _.each(years, function(year) { %>
        <li role="presentation"><a href="#<%= htmlEncode(year) %>" aria-controls="<%= htmlEncode(year) %>" id="<%= htmlEncode(year) %>" role="tab" data-toggle="tab"><%= htmlEncode(year) %></a></li>
        <% }); %>
    </ul>

  <!-- Tab panes -->
  <div class="tab-content">
        <% _.each(years, function(year) { %>
        <div role="tabpanel" class="tab-pane" id="<%= htmlEncode(year) %>"></div>
        <% }); %>
    </div>
</script>

<script type="text/template" id="regions-template">
  <select multiple="multiple" id="regions" name="regions[]">
        <% _.each(regions, function(region) { %>
            <option value='<%= htmlEncode(region.region_code) %>'><%= htmlEncode(region.label) %></option>
        <% }); %>
    </select>
  <div id="region-op-all">
    <a href='#' id='select-all'>select all</a>
    <a href='#' id='deselect-all'>deselect all</a>
  </div>

</script>

<script type="text/template" id="topic-list-template">

  <h4><%=  htmlEncode(title) %></h4>

  <div class="selected-info">
    <span class="selected">#</span> of <span class="total">#</span> selected
        <% if(level !== 1) { %>
            <button type="button" class="switch btn btn-primary btn-xs"></button>
        <% }; %>
    </div>

  <div class="topic-list-container">
    <div id="connector<%=  htmlEncode(level) %>" class="accolade connector"></div>
    <div class="topic-list" id="topic-list-<%=  htmlEncode(level) %>">

      <div class="nosubitems">Sorry, no subitems available.</div>
            <% _.each(topics, function(topic) { %>
            <div class="topic" id="<%=  htmlEncode(topic.histclass_id) %>"
                 data-level="<%=  htmlEncode(topic.level) %>"
                 data-parent="<%=  htmlEncode(topic.parent_id) %>"
                 title="<%= htmlEncode(topic.name) %>"
                 data-placement="top">
      <div class="checkboxes">
        <div class="checkbox" title="(de)selects this topic as aggregated value" data-toggle="tooltip"  data-placement="top"></div>
                    <% if(topic.childCount > 0) { %>
                       <div class="checkbox-depth" title="(de)selects all underlying items" data-toggle="tooltip" data-placement="top"> </div>
                    <% }; %>
                </div>
      <span><%= htmlEncode(topic.name) %></span>
    </div>
            <% }); %>
        </div>
  </div>

  <div class="all">
    <div><div class="checkbox all" title="(de)selects all topics as aggregated values" data-toggle="tooltip"></div> (de)select all as aggregated</div><br>
    <div> <div class="checkbox-depth all" title="(de)selects all topics + underlying items" data-toggle="tooltip"></div> (de)select all + subitems</div>
  </div>
</script>

<div id="tree">
  <div id="treeclose">
    <a href="#" onclick="hideTree();"><i class="fa fa-times"></i></a>
  </div>
  <div id="treeoverlay"></div>
  <div id="tree-container"></div>
</div>




<div id="copyright"><?php print $copyright; ?></div>