import React, { Fragment } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import "../../styles/TextArea.scss";

const TextArea = ({value, labelText, onChange, name, placeholder, required, className}) => {
	const id = nanoid();
	
	return (
		<Fragment>
			<label htmlFor={id}>{labelText}</label>
			<textarea
				className={className}
				required={required}
				value={value}
				onChange={onChange}
				id={id}
				name={name}
				placeholder={placeholder}
			/>
		</Fragment>
	);
};

TextArea.propTypes = {
	value: PropTypes.any.isRequired,
	labelText: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	className: PropTypes.string
};

export default TextArea;
