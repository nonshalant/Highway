import { Combobox, ComboboxInput } from '@reach/combobox'
import React from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete'

const AutoComplete = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete()

  return (
    <div>
        <Combobox>
            <ComboboxInput value={value} onChange={e => setValue(e.target.value)} />
        </Combobox>
    </div>
  )
}

export default AutoComplete