
(function(){

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    _.templateSettings = {
        interpolate: /\<\@\=(.+?)\@\>/gim,
        evaluate: /\<\@(.+?)\@\>/gim
    };

    window.template = function(id){
        return _.template( $('#' + id).html());
    };

    // helper functions
    window.percentify = function(value){
        var value = value * 100
        return parseFloat(value.toFixed(2));
    };

    window.get_selected_filters = function(){
        var filters = {};
        filters.incidents = [];
        filters.peoples = [];
        $("input:radio").each(function(){
            var $this = $(this);
            if($this.is(":checked")){
                var filter_id = $this.attr("id");
                var filter_type = $this.attr("class");
                filters[filter_type].push(filter_id)
            };
        });
        $("input:checkbox").each(function(){
            var $this = $(this);
            if($this.is(":checked")){
                var filter_id = $this.attr("id");
                var filter_type = $this.attr("class");
                filters[filter_type].push(filter_id)
            }
        });
        return filters;
    };

    window.create_groups = function(object, key){
        var output = object.groupBy(function(model){
            return model.get(key);
        });
        return output;
    };

    window.parse_year = function(date_time){
        var output = moment(date_time).locale("en").format("YYYY");
        output = parseInt(output);
        return output
    };

    String.prototype.toProperCase = function(){
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    App.Models.Incident = Backbone.Model.extend({
        defaults: {
            url: null,
            district_attorney_file_number: null,
            district_attorney_county: null,
            district_attorney_prepared_report: null,
            general_location_of_incident: null,
            type_of_incident: null,
            officer_shots_fired: null,
            da_on_scene: null,
            da_investigator_on_scene: null,
            officer_name_and_badge_number: null,
            officer_police_agency: null,
            officer_special_unit: null,
            officer_charges_filed_yes_detail: null,
            date_of_incident: null,
            district_attorney_date_of_letter: null,
            multiple_officers: null,
            car_stop: null,
            fatal: null,
            case_relevant: null,
            officer_charges_filed: null,
            officer_self_defense: null,
            officer_defense_of_civillians: null,
            officer_defense_of_officers: null,
            civilian_witnesses: null,
            officer_injured: null,
            type_of_incident_number: null,
            led_to_response_category: null,
            peoples: [],
        },
    });

    App.Collections.Incidents = Backbone.Collection.extend({
        model: App.Models.Incident,
        comparator: function(model) {
            return model.get("district_attorney_file_number");
        },
        url: "data.json"
    });

    App.Models.People = Backbone.Model.extend({
        defaults: {
            district_attorney_file_number: null,
            person_name: null,
        },
    });

    App.Collections.Peoples = Backbone.Collection.extend({
        model: App.Models.People,
        comparator: function(model) {
            return model.get("district_attorney_file_number");
        },
    });

    App.Router = Backbone.Router.extend({

        routes: {
            "": "fetchData",
        },

        fetchData: function(){
            var _this = this;
            var incidents = new App.Collections.Incidents();
            incidents.fetch({
                async: true
            });
            var checkExist = setInterval(function() {
                if (incidents.length > 0){
                    clearInterval(checkExist);
                    _this.renderApplicationVisuals(incidents);
                }
            }, 500);
        },

        renderApplicationVisuals: function(incidents){
            if (this.applicationVisuals){
                this.applicationVisuals.remove();
            };
            var array_of_people = [];
            incidents.forEach(function(model, index){
                var _this = model.attributes;
                _this.peoples.forEach(function(item, index){
                    array_of_people.push(item);
                });
            });
            var peoples = new App.Collections.Peoples(array_of_people);
            this.applicationVisuals = new App.Views.ApplicationVisuals({
                // total_incidents: incidents,
                total_peoples: peoples,
                container: ".data-filters"
            });
            return this.applicationVisuals;
        },
    });

    App.Views.ApplicationVisuals = Backbone.View.extend({

        el: ".data-filters",

        initialize: function(object){

            this.view_object = object;

            this.view_object.template = template("my_template");

            // this.view_object.relevant_incidents = new App.Collections.Incidents(
            //     this.view_object.total_incidents.where({
            //         case_relevant: true
            //     })
            // );

            this.view_object.relevant_people = new App.Collections.Peoples(
               this.view_object.total_peoples.where({
                   case_relevant: true
               })
            );

            this.view_object = this.calculate_model_attributes(this.view_object);

            this.view_object.filters = [{
                // type: "incidents",
                // proper: "Incident",
                // radio_buttons: [{
                //     field_name: "fatal_non",
                //     buttons: [
                //         {opt: "Fatal", opt_field: "fatal"},
                //         {opt: "Non-fatal", opt_field: "nonfatal_calc"},
                //     ]}
                //     // , {
                //     // field_name: "lethal_force_as_first_response",
                //     // buttons: [
                //     //     {opt: "Lethal Force as First Response", opt_field: "lethal_force_as_first_calc"},
                //     //     {opt: "Non-lethal Force as First Response", opt_field: "other_force_as_first_calc"},
                //     // ]}
                // ],
                // checkboxes: []}, {
                // type: "peoples",
                // proper: "Officer",
                // radio_buttons: [],
                // checkboxes: [
                //     {opt: "Officer Issued Commands That Were Ignored", opt_field: "person_ignored_officer_commands"},
                //     {opt: "Officer Said Person Reached for Waistband", opt_field: "mention_of_waistband_in_report"},
                //     {opt: "Officer Couldn't See Person's Hands", opt_field: "officer_couldnt_see_persons_hands"},
                //     {opt: "Officer Said Person Grabbed For Service Firearm", opt_field: "grabbed_officers_weapon"},
                //     {opt: "Officer Said Vehicle Used as Weapon", opt_field: "vehicle_as_weapon"},
                // ]}, {
                type: "peoples",
                proper: "Person",
                radio_buttons: [{
                    field_name: "fatal_non",
                    buttons: [
                        {opt: "Fatal", opt_field: "fatal"},
                        {opt: "Non-fatal", opt_field: "nonfatal_calc"},
                    ]}, {
                    field_name: "armed_non",
                    buttons: [
                        {opt: "Unarmed", opt_field: "person_unarmed"},
                        {opt: "Firearm", opt_field: "armed_with_firearm_calc"},
                        {opt: "Other Weapon", opt_field: "armed_with_other_calc"},
                    ]}, {
                    field_name: "gender",
                    buttons: [
                        {opt: "Female", opt_field: "person_female"},
                        {opt: "Male", opt_field: "person_male"},
                    ]}
                ],
                checkboxes: [
                    {opt: "Officer Said Person Reached for Waistband", opt_field: "mention_of_waistband_in_report"},
                    {opt: "Officer Couldn't See Person's Hands", opt_field: "officer_couldnt_see_persons_hands"},
                    {opt: "Officer Said Person Grabbed For Service Firearm", opt_field: "grabbed_officers_weapon"},
                    {opt: "Officer Said Vehicle Used as Weapon", opt_field: "vehicle_as_weapon"},
                    {opt: "Pursuit Occurred", opt_field: "pursuit_occurred"},
                    {opt: "Signs of Drug/Alcohol Impairment", opt_field: "person_intoxicated"},
                    {opt: "Signs of Person Mental Illness", opt_field: "person_mentally_ill"},
                ]}
            ];
            this.render();
        },

        calculate_model_attributes: function(view_object){
            view_object.genders = [];
            view_object.ethnicities = [];
            view_object.relevant_people.forEach(function(model, index){
                var _this = model.attributes;
                model.set("year_of_incident", parse_year(_this.date_of_incident));

                // push gender to view object
                if (_this.person_gender != null || _this.person_gender != undefined){
                    if (_this.person_gender === "MALE"){
                        model.set("person_gender", "male");
                        model.set("person_male", true);
                        view_object.genders.push(_this.person_gender);
                    } else if (_this.person_gender === "FEMALE"){
                        model.set("person_gender", "female");
                        model.set("person_female", true);
                        view_object.genders.push(_this.person_gender);
                    } else {
                        model.set("person_gender", null);
                        model.set("person_male", false);
                        model.set("person_female", false);
                    };
                };

                // push ethnicities to view object
                if (_this.person_ethnicity != null || _this.person_ethnicity != undefined){
                    if (_this.person_ethnicity === "HISPANIC/LATIN AMERICAN"){
                        model.set("person_ethnicity", "hispanic");
                    } else if (_this.person_ethnicity === "MIDDLE EASTERN"){
                        model.set("person_ethnicity", "middle-eastern");
                    } else {
                        model.set("person_ethnicity", _this.person_ethnicity.toLowerCase());
                    };
                    view_object.ethnicities.push(_this.person_ethnicity);
                };
            });
            view_object.people_years = _.uniq(view_object.relevant_people.pluck("year_of_incident")).sort();
            view_object.genders = _.uniq(view_object.genders).sort();
            view_object.ethnicities = _.uniq(view_object.ethnicities).sort();
            return view_object;
        },

        events: {
            "click [type='radio']": "construct_filtered_data",
            "click [type='checkbox']": "construct_filtered_data",
            "click #clear-filters": "clear_checkbox_filters",
        },

        render: function(){
            $(this.view_object.container).html(this.view_object.template(this.view_object));
            this.view_object.obj = {};
            this.view_object.obj.filtered = {};
            this.view_object.obj.init = {};

            // this.view_object.obj.total_incidents_initial = this.view_object.total_incidents.length;
            // this.view_object.obj.total_people_initial = this.view_object.total_people.length;
            // this.view_object.obj.init.incidents = this.view_object.relevant_incidents;
            // this.view_object.obj.init.yearly_incident = create_groups(this.view_object.obj.init.incidents, "year_of_incident");

            this.view_object.obj.init.people = this.view_object.relevant_people;
            this.view_object.obj.init.yearly_people = create_groups(this.view_object.obj.init.people, "year_of_incident");

            this.display_data(this.view_object.obj, true);
        },

        display_data: function(obj, initial){
            // $("td#all-people").html(obj.total_people_initial);
            $("td#relevant-people").html(obj.init.people.length);
            // $("td#all-incidents").html(obj.total_incidents_initial);
            // $("td#relevant-incidents").html(obj.init.incidents.length);
            if (initial === true){
                this.chart_initial_data(obj);
                // this.chart_data(obj.init, obj.init.people.length, "black");
            } else {
                this.chart_filtered_data(obj);
                // this.chart_data(obj.filtered, obj.init.people.length, "red");
            };
        },

        // chart_data: function(obj, total, color){
        //     if (obj.people.length > 0){
        //         $("td#filtered-people").html(obj.people.length + " / " + total + "<br />" + percentify(obj.people.length / total) + "%");
        //         $("td#filtered-people").css({color: color});
        //     } else {
        //         $("td#filtered-people").html("n/a" + "<br />" + "0.00%");
        //         $("td#filtered-people").css({color: "rgba(0, 0, 0, 0.3)"});
        //     };
        //     var is_empty = _.isEmpty(obj.yearly_people);
        //     if (is_empty === true){
        //         _.keys(obj.yearly_people).forEach(function(value){
        //             $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
        //             $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
        //         });
        //     } else {
        //         this.view_object.people_years.forEach(function(item, index, list){
        //             var has_year_data = _.has(obj.yearly_people, item);
        //             if (has_year_data === false){
        //                 obj.yearly_people[item] = [];
        //             }
        //         });
        //         _.keys(obj.yearly_people).forEach(function(value){
        //             var data = obj.yearly_people[value];
        //             if (data.length > 0){
        //                 $("td#people_" + value).html(data.length + " / " + total + "<br />" + percentify(data.length / total) + "%");
        //                 $("td#people_" + value).css({color: color});
        //             } else {
        //                 $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
        //                 $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
        //             };
        //             $("div#people_" + value).html(data.length);
        //             var height = "height: " + percentify(data.length / 100) + "%"
        //             $("li#people_" + value).attr("style", height);
        //         });
        //     };
        // },

        chart_initial_data: function(obj){
            if (obj.init.people.length > 0){
                $("td#filtered-people").html(obj.init.people.length + " / " + obj.init.people.length + "<br />" + percentify(obj.init.people.length / obj.init.people.length) + "%");
                $("td#filtered-people").css({color: "black"});
            } else {
                $("td#filtered-people").html("n/a" + "<br />" + "0.00%");
                $("td#filtered-people").css({color: "rgba(0, 0, 0, 0.3)"});
            };
            var is_empty = _.isEmpty(obj.init.yearly_people);
            if (is_empty === true){
                _.keys(obj.init.yearly_people).forEach(function(value){
                    $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
                    $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
                });
            } else {
                this.view_object.people_years.forEach(function(item, index, list){
                    var has_year_data = _.has(obj.init.yearly_people, item);
                    if (has_year_data === false){
                        obj.init.yearly_people[item] = [];
                    }
                });
                _.keys(obj.init.yearly_people).forEach(function(value){
                    var data = obj.init.yearly_people[value];
                    if (data.length > 0){
                        $("td#people_" + value).html(data.length + " / " + obj.init.people.length + "<br />" + percentify(data.length / obj.init.people.length) + "%");
                        $("td#people_" + value).css({color: "black"});
                        // $("div#people_" + value).html(data.length);
                        // $("li#people_" + value).attr("style", "height: " + percentify(data.length / 100) + "%");
                    } else {
                        $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
                        $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
                        // $("div#people_" + value).html(data.length);
                        // $("li#people_" + value).attr("style", "height: " + percentify(data.length / 100) + "%");
                    };
                });
            };
        },

        chart_filtered_data: function(obj){
            if (obj.filtered.people.length > 0){
                $("td#filtered-people").html(obj.filtered.people.length + " / " + obj.init.people.length + "<br />" + percentify(obj.filtered.people.length / obj.init.people.length) + "%");
                $("td#filtered-people").css({color: "red"});
            } else {
                $("td#filtered-people").html("n/a" + "<br />" + "0.00%");
                $("td#filtered-people").css({color: "rgba(0, 0, 0, 0.3)"});
            };
            var is_empty = _.isEmpty(obj.filtered.yearly_people);
            if (is_empty === true){
                _.keys(obj.init.yearly_people).forEach(function(value){
                    $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
                    $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
                });
            } else {
                this.view_object.people_years.forEach(function(item, index, list){
                    var has_year_data = _.has(obj.filtered.yearly_people, item);
                    if (has_year_data === false){
                        obj.filtered.yearly_people[item] = [];
                    }
                });
                _.keys(obj.filtered.yearly_people).forEach(function(value){
                    var data = obj.filtered.yearly_people[value];
                    if (data.length > 0){
                        $("td#people_" + value).html(data.length + " / " + obj.filtered.people.length + "<br />" + percentify(data.length / obj.filtered.people.length) + "%");
                        $("td#people_" + value).css({color: "red"});
                        // $("div#people_" + value).html(data.length);
                        // $("li#people_" + value).attr("style", "height: " + percentify(data.length / 100) + "%");
                    } else {
                        $("td#people_" + value).html("n/a" + "<br />" + "0.00%");
                        $("td#people_" + value).css({color: "rgba(0, 0, 0, 0.3)"});
                        // $("div#people_" + value).html(data.length);
                        // $("li#people_" + value).attr("style", "height: " + percentify(data.length / 100) + "%");
                    };
                });
            };
        },

        construct_filtered_data: function(){
            this.view_object.obj.active_checkboxes = get_selected_filters();
            var incident_filters = {};
            _.each(this.view_object.obj.active_checkboxes.incidents, function(item, index, list){
                return incident_filters[item] = true;
            });
            var people_filters = {};
            _.each(this.view_object.obj.active_checkboxes.peoples, function(item, index, list){
                return people_filters[item] = true;
            });
            var all_filters = _.extend(incident_filters, people_filters);
            this.view_object.obj.filtered.people = new App.Collections.Peoples(
                this.view_object.obj.init.people.where(all_filters)
            );
            this.view_object.obj.filtered.yearly_people = create_groups(this.view_object.obj.filtered.people, "year_of_incident");
            // var case_ids = this.view_object.obj.filtered.people.pluck("district_attorney_file_number");
            // this.view_object.obj.filtered.incidents = new App.Collections.Incidents();
            // this.view_object.obj.filtered.incidents
            //     .add(this.view_object.obj.init.incidents.models
            //          .filter(function(model){
            //             return case_ids.indexOf(model.attributes.district_attorney_file_number) !== -1;
            //         })
            //     );
            // this.view_object.obj.filtered.yearly_incident = create_groups(this.view_object.obj.filtered.incidents, "year_of_incident");
            this.display_data(this.view_object.obj, false);
        },

        clear_checkbox_filters: function(){
            $("input:radio").each(function(){
                $(this).attr("checked", false);
            });
            $("input:checkbox").each(function(){
                $(this).attr("checked", false);
            });
            this.render();
        },

    });

})();

$(function(){
    window.app = new App.Router();
    Backbone.history.stop();
    Backbone.history.start({
        root: "",
        pushState: false,
    });
});
