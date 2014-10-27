// Generated by CoffeeScript 1.8.0
Traitify.ui.widget("personalityTraits", function(widget, options) {
  widget.states.add("initialized");
  widget.callbacks.add("Initialize");
  widget.dataDependency("PersonalityTraits");
  widget.styleDependency("all");
  widget.styleDependency("results/personality-traits");
  widget.initialization.events.add("Setup Data", function() {
    widget.views.render("Personality Traits Container").appendTo("main");
    return widget.callbacks.trigger("Initialize");
  });
  return widget.views.add("Personality Traits Container", function() {
    var personalityTraitsWidgetContainer, personalityType, trait, _i, _len, _ref;
    personalityTraitsWidgetContainer = this.tags.div("tfPersonalityTraits");
    this.tags.div("personalityTraits").appendTo("tfPersonalityTraits");
    _ref = this.data.get("PersonalityTraits").slice(0, 8);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      trait = _ref[_i];
      trait = trait.personality_trait;
      personalityType = trait.personality_type;
      this.tags.div(["personalityTraits.trait"], {
        style: {
          borderColor: "#" + personalityType.badge.color_1
        }
      }).appendTo("personalityTraits");
      this.tags.div(["personalityTraits.trait.name"], trait.name).appendTo(["personalityTraits.trait", _i]);
      this.tags.div(["personalityTraits.trait.background"], {
        style: {
          backgroundImage: "url('" + personalityType.badge.image_medium + "')"
        }
      }).appendTo(["personalityTraits.trait", _i]);
      this.tags.div(["personalityTraits.trait.definition"], trait.definition).appendTo(["personalityTraits.trait", _i]);
    }
    return personalityTraitsWidgetContainer;
  });
});