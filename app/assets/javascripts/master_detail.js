$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

$('.grow').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
  $thisGridL1.dxDataGrid({
    width: $level1.width()
  });
  $thisGridL1.css('overflow', 'none');
});

window.show_level_1 = function(data_to_show) {
  $('#selected_container_id').val('level_1_grid');
  $('#is_master_detail').val(true);
  $level1.addClass('span12 grow dx-back-hidden').html(data_to_show).removeClass('hidden');
  $level2.removeClass('span3 span6').addClass('hidden').animateCss('fadeInRight');
  $level3.removeClass('span6').addClass('hidden').animateCss('fadeInLeft');
  remove_level_back('level_1');
  remove_level_back('level_2');
}

window.show_level_2 = function(data_to_show) {
  $('#selected_container_id').val('level_2_grid');
  $('#is_master_detail').val(true);
  $level1.removeClass('span12 dx-back-hidden').addClass('span3 grow');
  $level2.addClass('span9 grow dx-back-hidden').html(data_to_show).removeClass('hidden');
  $level3.addClass('hidden ').removeClass('span6');
  reset_grid('#level_1_grid', 'level_2');
  level_back('level_1');

  $thisGridL2 = $('#level_2_grid');
  if ($thisGridL2.length > 0) {
    reset_grid('#level_2_grid', 'level_2');
  }
  remove_level_back('level_2');
}

window.show_level_3 = function(data_to_show, level_3_grid_id) {
  level_3_grid_id = level_3_grid_id || 'level_3_grid';
  $('#selected_container_id').val(level_3_grid_id);
  $('#is_master_detail').val(true);
  $level1.removeClass('span3').addClass('span2 grow');
  $level2.removeClass('span9 dx-back-hidden').addClass('span3 grow ');
  $level3.removeClass('hidden').addClass('span7 grow ').html(data_to_show);
  $('#level_3 .dx-datagrid').animateCss('fadeIn');
  $('.back-return').css('visibility', 'visible').animateCss('fadeIn');
  reset_grid('#level_1_grid', 'level_3');
  reset_grid('#level_2_grid', 'level_3');
  level_back('level_2');

  $thisGridL3 = $('#' + level_3_grid_id);
  if ($thisGridL3.length > 0) {
    reset_grid('#' + level_3_grid_id, 'level_3');
  }
}

function unhide_back_button(event) {
  $('[data-md-level="#' + event.currentTarget.id + '"]').removeClass('hidden').animateCss('fadeIn');
}

function hide_back_button(event) {
  $('[data-md-level="#' + event.currentTarget.id + '"]').addClass('hidden');
}

function level_back(level_id) {
  var $lvlSel = $('#' + level_id);

  $lvlSel.on('mouseenter', unhide_back_button);
  $lvlSel.on('mouseleave', hide_back_button);
}

function remove_level_back(level_id) {
  var $lvlSel = $('#' + level_id);

  $lvlSel.off('mouseenter', unhide_back_button);
  $lvlSel.off('mouseleave', hide_back_button);
}

function clickBack(btn, level) {

  $('body').on('click', btn, function() {
    level();
    $('.dx-md-return').addClass('hidden');
  });
}

function reset_grid(selector, level, factory_reset = false){
  var $grid = $(selector);
  var dataGrid;

  /**
   * This setting is used to bypass setting the grid back to the default state when reset_grid is called without a compact view.
   * This prevents the grid from reloading/refreshing and making additional calls to the server when it's not necessary.
   * Note: this is only applicable when we do not have a compact view defined for the grid as the compact view columns
   *       will no longer resize themselves nicely.
   **/
  var apply_default_state_on_reset = $grid.data("internal_master_detail-apply_default_state_on_reset") ?? true;

  /**
   * This setting is to disable repainting of the grid and updating dimensions when reset_grid is called.
   * This produces a smoother experience as the columns will no longer resize themselves when switching between levels.
   * Repaint should only be disabled if there is no need to resize columns to fit them on the left of the page when the
   * second grid is shown.
   * Note: this is only applicable when we do not have a compact view defined for the grid as the compact view columns
   *       will no longer resize themselves nicely.
   **/
  var disable_repaint = $grid.data("internal_master_detail-disable_repaint") ?? false;

  try {
    if ($grid.data("compact-view") && ($grid.data("compact-view")[level] || []).length > 0) {
      $.each($grid.data("compact-view")[level], function (i, item) {
        $grid.dxDataGrid('columnOption', item.name, item.property, item.value);
      });
    } else if (factory_reset && apply_default_state_on_reset) {
      if ($grid.data("default-state-json") !== undefined) {
        $grid.dxDataGrid('instance').state($grid.data("default-state-json"));
      } else {
        $grid.dxDataGrid({
          columns: $grid.data("default-json")
        });
      }
    }
  }
  catch(e) {
    // Catches the instance where the compact view is not defined in a master detail (but its indeterminable)
  }
  finally {
    if (disable_repaint) return;

    window.setTimeout(function () {
      // If someone is clicking fast on different rows, the grid may not be on the dom anymore.
      // We don't want to repaint the grid if it isn't there. Plus, it will fail if it isn't there.
      if ($(selector).length > 0) {
        dataGrid = $grid.dxDataGrid('instance');
        dataGrid.repaint();
        dataGrid.updateDimensions();
      }
    }, 1000);
  }
}

window.initMasterDetail = function() {
  $thisGridL1 = $('#level_1_grid');
  $thisGridL2 = undefined;
  $thisGridL3 = undefined;
  $level1 = $('#level_1');
  $level2 = $('#level_2');
  $level3 = $('#level_3');
  $allLevels = $('#level_1, #level_2, #level_3');
  $allLevels.css('overflow', 'none');
  show_level_1();

  clickBack('.btn-return-l1', show_level_1);
  clickBack('.btn-return-l2', show_level_2);

  $('body').on('click', '.btn-return-l1', function () {
    reset_grid('#level_1_grid', 'level_1', true)
  });

  this.showErrorDialog = function() {
    $('#dialog_error').modal('hide');
    return false;
  };

  $('#grid_toolbar').remove();
}
