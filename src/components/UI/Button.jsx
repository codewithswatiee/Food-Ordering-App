import React from 'react'

function Button({children, textOnly, className, ...props}) {

    const cssClass = textOnly ? `text-button ${className}` : `button ${className}`;
  return (
    <button {...props} className={cssClass}>
        {children}
    </button>
  )
}

export default Button
