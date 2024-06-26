module Devextreme
  module DataTableFormatters

    class << self

      def format_text
        {:data_type => 'string'}
      end

      def format_percentage(precision = 3)
        {:format => { :type => 'fixedPoint', :precision => precision}, :alignment => 'right', :data_type => 'number'}
      end

      def format_fixed(precision = 2)
        {:format => { :type => 'fixedPoint', :precision => precision}, :alignment => 'right', :data_type => 'number'}
      end

      def format_date(format = 'MMM dd, yyyy')
        {:format => format, :data_type => 'date'}
      end

      def format_time(format = 'shortTime')
        {:format => format, :data_type => 'date'}
      end

      def format_timeago
        {:data_type => 'date', :cell_template => :column_template_timeago}.merge(grouping_disable)
      end

      def format_timeago2
        {:data_type => 'date', :cell_template => :column_template_timeago2}.merge(grouping_disable)
      end

      def format_timestamp
        {:data_type => 'date', :cell_template => :column_template_timestamp}.merge(grouping_disable)
      end

      def format_hidden
        {:data_type => 'string', :visible => false, :show_in_column_chooser => false, :downloadable => false, :user_visible => false , :css_class => 'hidden'}.merge(grouping_disable)
      end

      def format_icon
        {:alignment => 'center', :cell_template => :column_template_icon}.merge(grouping_disable)
      end

      def format_mailto
        {:data_type => 'string', :cell_template => :column_template_mailto}.merge(grouping_disable)
      end

      def format_linkto
        {:data_type => 'string', :cell_template => :column_template_linkto}.merge(grouping_disable)
      end

      def format_linkto_content
        {:data_type => 'string', :cell_template => :column_template_linkto_content}.merge(grouping_disable)
      end

      def format_cell_content
        {:data_type => 'string', :cell_template => :column_template_cell_content}.merge(grouping_disable)
      end

      def format_bool
        {:data_type => 'boolean', :show_editor_always => false, :false_text => 'No', :true_text => 'Yes'}
      end

      def format_background_task_info
        {:cell_template => :column_template_background_task_info}.merge(grouping_disable)
      end

      def format_background_task_args
        {:cell_template => :column_template_background_task_args}.merge(grouping_disable)
      end

      def format_to_html
        {:cell_template => :column_template_html}.merge(grouping_disable)
      end

      def format_background_task_descriptor
        {:cell_template => :column_template_background_task_descriptor}.merge(grouping_disable)
      end

      def format_progress_bar
        {:cell_template => :column_template_progress_bar}.merge(grouping_disable)
      end

      def column_template_exports_portfolio_filters
        {:cell_template => :column_template_exports_portfolio_filters}.merge(grouping_disable)
      end

      def column_template_popup
        {:cell_template => :column_template_popup}.merge(grouping_disable)
      end

      def format_checkbox
        self.format_bool.merge(:cell_template => :column_template_checkbox)
      end

      def format_html
        { :encode_html => false }
      end

      def format_label
        {:cell_template => :column_template_label, :alignment => 'center'}
      end

      def format_label_with_modal
        {:cell_template => :column_template_label_with_modal}
      end

      def filter_disable
        {:allow_filtering => false}
      end

      def sort_disable
        {:allow_sorting => false}
      end

      def filter_sort_disable
        filter_disable.merge(sort_disable)
      end

      def grouping_disable
        {:allow_grouping => false}
      end

      def hide_grouping_column_name
        {:group_cell_template => :hide_grouping_column_name_group_cell_template}
      end

      def summary_sum(precision = 2)
        {:summaryType => 'sum'}
      end

      def summary_min(precision = 2)
        {:summaryType => 'min'}
      end

      def summary_max(precision = 2)
        {:summaryType => 'max'}
      end

      def summary_avg(precision = 2)
        {:summaryType => 'avg'}
      end

      def summary_count
        {:summaryType => 'count'}
      end

      def summary_custom
        # default displayFormat is '{0}'
        {:summaryType => 'custom'}
      end

    end

  end
end
