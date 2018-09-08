import React, { Fragment } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import "../../styles/Input.scss";

const Input = ({value, style, labelText, onChange, type, name, placeholder, required, className, disabled, onClick, readOnly, error}) => {
	const id = nanoid();
	
	return (
		<Fragment>
			<label htmlFor={id}>{labelText}</label>
			<input
				className={className}
				required={required}
				value={value}
				onChange={onChange}
				id={id}
				name={name}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				onClick={onClick}
				readOnly={readOnly}
				style={style}
			/>
			{!!error ? <span className="error">{error}</span> : null}
		</Fragment>
	);
};

Input.propTypes = {
	value: PropTypes.any.isRequired,
	labelText: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	readOnly: PropTypes.bool,
	error: PropTypes.string,
	style: PropTypes.object
};

export default Input;
