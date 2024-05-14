import React from "react";
import theme from "theme";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { styles } from "./Autocomplete.styles";
import { withStyles } from "@material-ui/styles";
import { MenuItem, Paper } from "@material-ui/core";
import * as Inputs from "../Forms/Inputs";

/**
 * Renders the input component for the Autosuggest component.
 *
 * @param {Object} inputProps - The input props.
 * @returns {JSX.Element} The rendered input component.
 */
function renderInputComponent(inputProps) {
  const {
    classes,
    inputRef = () => {},
    inputClassName,
    ref,
    ...other
  } = inputProps;
  return (
    <Inputs.TextFieldInput
      fullWidth
      field={{ name: "" }}
      standAlone={true}
      value={"Type"}
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
      }}
      {...other}
    />
  );
}

/**
 * Renders a suggestion item in the Autosuggest component.
 *
 * @param {Object} suggestion - The suggestion object.
 * @param {Object} param1 - The parameters object.
 * @returns {JSX.Element} The rendered suggestion item.
 */
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name || suggestion.title, query);
  const parts = parse(suggestion.name || suggestion.title, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

/**
 * Gets the suggestion value for the Autosuggest component.
 *
 * @param {Object} suggestion - The suggestion object.
 * @returns {string} The suggestion value.
 */
function getSuggestionValue(suggestion) {
  return suggestion.name || suggestion.title;
}

/**
 * Renders the section title in the Autosuggest component.
 *
 * @param {Object} section - The section object.
 * @returns {JSX.Element} The rendered section title.
 */
function renderSectionTitle(section) {
  return <strong>{section.modelName}</strong>;
}

/**
 * Gets the suggestions for a section in the Autosuggest component.
 *
 * @param {Object} section - The section object.
 * @returns {Array} The suggestions for the section.
 */
function getSectionSuggestions(section) {
  return section.res;
}

/**
 * Autocomplete component for providing suggestions based on user input.
 *
 * @class Autocomplete
 * @extends React.Component
 */
class Autocomplete extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: [],
  };

  /**
   * Handles the fetch of suggestions based on the user input.
   *
   * @param {Object} param0 - The fetch request parameters.
   */
  handleSuggestionsFetchRequested = ({ value }) => {
    const { loadSuggestions, isMultiple } = this.props;
    const updateSuggestions = (newState, prevState) =>
      this.setState({ ...prevState, newState });
    return loadSuggestions(value, updateSuggestions).then((res) => {
      this.setState({ suggestions: res });
    });
  };

  /**
   * Handles the clear of suggestions.
   */
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  /**
   * Handles the change of the input value.
   *
   * @param {string} name - The name of the input field.
   * @returns {Function} The event handler function.
   */
  handleChange = (name) => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {
      classes,
      isMultiple,
      onSelect,
      placeholder,
      inputClassName,
      throttleSearch,
    } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };
    return (
      <Autosuggest
        className={inputClassName}
        {...autosuggestProps}
        inputProps={{
          classes,
          placeholder: placeholder ? placeholder : "Search",
          value: this.state.single,
          onChange: this.handleChange("single"),
        }}
        theme={{
          container: inputClassName ? inputClassName : classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        multiSection={isMultiple}
        getSectionSuggestions={getSectionSuggestions}
        renderSectionTitle={renderSectionTitle}
        renderSuggestionsContainer={(options) => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
        onSuggestionSelected={(
          event,
          { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
        ) => {
          onSelect(suggestion);
        }}
      />
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { defaultTheme: theme })(Autocomplete);
