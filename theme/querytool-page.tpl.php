<div id="header" xmlns="http://www.w3.org/1999/html">
  <img src="<?php print $logo; ?>" id="logo" alt="" class="" />
  <div id="langmenu">
    <?php print $lang_menu; ?>
  </div>

  <h1><?php print $title; ?></h1>

  <div id="close">
    <a href="#" onclick="closeWindow();"><i class="fa fa-times"></i></a>
  </div>
</div>

<?php print $messages; ?>

<div id="mainmessage-container"></div>
<div id="qsv"></div>

<div id="main">

  <div id="classmodeselection" class="step">
    <h2>
      <span class="stepnum"></span>
      <script>document.write(polyglot.t("choose-data-categories"));</script>
      <a href="#" class="question-mark" data-toggle="modal"  data-target="#step1expl"><i class="fa fa-question-circle"></i></a>
    </h2>
    <div id="classmodes"></div>

    <div class="modal fade" id="step1expl" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
          </div>
          <div class="modal-body">
            <script>document.write(polyglot.t("data-categories-info"));</script>
            <div class="documentation">...</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="yearselection"  class="step">
    <h2><span class="stepnum"></span><script>document.write(polyglot.t("choose-year"));</script>
      <a href="#" class="question-mark" data-toggle="modal"  data-target="#step2expl"><i class="fa fa-question-circle"></i></a>
    </h2>
    <div id="yearcontainer"> </div>

    <div class="modal fade" id="step2expl" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
          </div>
          <div class="modal-body"><script>document.write(polyglot.t("year-info"));</script> </div>
        </div>
      </div>
    </div>
  </div>

  <div id="regionselection" class="step">
    <h2><span class="stepnum"></span><script>document.write(polyglot.t("choose-regions"));</script>
      <a href="#" class="question-mark" data-toggle="modal"  data-target="#step3expl"><i class="fa fa-question-circle"></i></a></h2>

    <div id="regioncontainer"> </div>

    <div class="modal fade" id="step3expl" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
          </div>
          <div class="modal-body">
            <script>document.write(polyglot.t("regions-info"));</script><br><br>
            <div class="documentation"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="topicselection" class="step">
    <a href="#" onclick="showTree();" id="show-tree"><i class="fa fa-sitemap"></i></a>
    <h2><span class="stepnum"></span><script>document.write(polyglot.t("choose-indicators"));</script>
      <a href="#" class="question-mark" data-toggle="modal"  data-target="#step4expl"><i class="fa fa-question-circle"></i></a></h2>

    <div id="topic-lists"></div>

    <div style="clear:both;"></div>
    <button id="btn-generate" type="button" class="btn btn-primary"><script>document.write(polyglot.t("generate"));</script></button>
    <div class="modal fade" id="step4expl" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
          </div>
          <div class="modal-body"><script>document.write(polyglot.t("indicators-info"));</script><br>
            <br>
            <div class="documentation"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="result" class="step">
    <h2><span class="stepnum"></span><script>document.write(polyglot.t("result"));</script> </h2>

    <div id="preview">
      <div id="preview-message"></div>
      <div class="zui-wrapper">
        <div class="zui-scroller">
        </div>
      </div>

    </div>

    <button id="btn-download" type="button" class="btn btn-primary"><script>document.write(polyglot.t("download"));</script> </button>
  </div>


</div>



<!-- UNDERSCORE TEMPLATES -->

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
        <% _.each(years, function(year){
          if(year.datacount == 0){  %>
        <li role="presentation"><div class="year-unavailable"><%= htmlEncode(year.num) %></div></li>
        <% }else{ %>
        <li role="presentation"><a href="#<%= htmlEncode(year.datacount) %>" aria-controls="<%= htmlEncode(year.datacount) %>" id="<%= htmlEncode(year.num) %>" role="tab" data-toggle="tab"><%= htmlEncode(year.num) %></a></li>
         <%} }); %>
    </ul>

  <!-- Tab panes -->
  <div class="tab-content">
        <% _.each(years, function(year) {

            if(year.datacount == 0){  %>
              <div role="tabpanel" class="tab-pane" id="hoi <%= htmlEncode(year.num) %>"></div>
            <% }else{ %>
              <div role="tabpanel" class="tab-pane" id="<%= htmlEncode(year.num) %>"></div>
              <% }

         }); %>
    </div>
</script>

<script type="text/template" id="regions-template">
  <select multiple="multiple" id="regions" name="regions[]">
        <% _.each(regions, function(region) { %>
            <option value='<%= htmlEncode(region.region_code) %>'><%= htmlEncode(region.label) %></option>
        <% }); %>
    </select>
  <div id="region-op-all">
    <a href='#' id='select-all'><%= polyglot.t("select-all") %> </a>
    <a href='#' id='deselect-all'><%= polyglot.t("deselect-all") %> </a>
  </div>

</script>

<script type="text/template" id="topic-list-template">

  <h4><%=  htmlEncode(title) %></h4>

  <div class="selected-info">
    <span class="selected">#</span> <%= polyglot.t("of") %> <span class="total">#</span> <%= polyglot.t("selected") %>
        <% if(level !== 1) { %>
            <button type="button" class="switch btn btn-primary btn-xs"></button>
        <% }; %>
    </div>

  <div class="topic-list-container">
    <div id="connector<%=  htmlEncode(level) %>" class="accolade connector"></div>
    <div class="topic-list" id="topic-list-<%=  htmlEncode(level) %>">

      <div class="nosubitems"><%= polyglot.t("no-subitems") %>.</div>
            <% _.each(topics, function(topic) { %>
            <div class="topic" id="<%=  htmlEncode(topic.class_id) %>"
                 data-level="<%=  htmlEncode(topic.level) %>"
                 data-parent="<%=  htmlEncode(topic.parent_id) %>"
                 title="<%= htmlEncode(topic.name) %>"
                 data-placement="top">
                <div class="checkboxes">
                  <div class="checkbox" title="<%= polyglot.t("single-checkbox-aggregated") %>" data-toggle="tooltip"  data-placement="top"></div>
                  <% if(topic.childCount > 0) { %>
                     <div class="checkbox-depth" title="<%= polyglot.t("single-checkbox-depth") %>" data-toggle="tooltip" data-placement="top"> </div>
                  <% }; %>
                </div>
                  <% if(topic.name !==".") { %>
                        <span><%= htmlEncode(topic.name) %></span>
                  <% }else{ %>
                        <span class="skip-arrow"> &LongRightArrow; </span>
                   <% }; %>
            </div>
            <% }); %>
        </div>
  </div>

  <div class="all">
    <div><div class="checkbox all" title="<%= polyglot.t("select-all-as-aggregated") %>" data-toggle="tooltip"></div> <%= polyglot.t("select-all-as-aggregated") %></div><br>
    <div> <div class="checkbox-depth all" title="<%= polyglot.t("select-all-depth") %>" data-toggle="tooltip"></div> <%= polyglot.t("select-all-depth") %></div>
  </div>
</script>

<div id="tree">
  <div id="treeclose">
    <a href="#" onclick="hideTree();"><i class="fa fa-times"></i></a>
  </div>
  <div id="treeoverlay"></div>
  <div id="tree-container"></div>
</div>

<div style="clear: both;"></div>
<div id="copyright"><?php print $copyright; ?></div>