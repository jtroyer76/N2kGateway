import React, { FC, useState, useEffect } from 'react';
import Schema, { ValidateFieldsError } from 'async-validator';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

import { Display, displayTypeKeyFromValue, DisplayTypeStrings } from './types';
import { ValidatedTextField } from '../../components';
import { validate } from '../../validators';
import { updateValue } from '../../utils';
import { boatDataKeyFromValue, BoatDataType, BoatDataTypeStrings, BoatDataTypeUnits } from '../boatdata';

interface DisplayFormProps {
    creating: boolean;
    validator: Schema;

    display?: Display;
    setDisplay: React.Dispatch<React.SetStateAction<Display | undefined>>;

    onDoneEditing: () => void;
    onCancelEditing: () => void;
}

const UserForm: FC<DisplayFormProps> = ({ creating, validator, display, setDisplay, onDoneEditing, onCancelEditing }) => {

    const updateFormValue = updateValue(setDisplay);
    const [fieldErrors, setFieldErrors] = useState<ValidateFieldsError>();
    const open = !!display;

    useEffect(() => {
        if (open) {
            setFieldErrors(undefined);
        }
    }, [open]);

    const validateAndDone = async () => {
        if (display) {
            try {
                setFieldErrors(undefined);
                await validate(validator, display);
                onDoneEditing();
            } catch (errors: any) {
                setFieldErrors(errors);
            }
        }
    };

    const changeDisplayType = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (display) {
            const displayType = displayTypeKeyFromValue(event.target.value)
            setDisplay({
                ...display,
                displayType: displayType,
                ...(displayType === 0 ?
                    {
                        dataType: BoatDataType.None,
                        units: ""
                    } :
                    {}
                )
            });
        }
    };

    const changeDataType = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("event value: ", event.target.value)
        console.log("Get value: ", boatDataKeyFromValue(event.target.value))
        console.log(BoatDataTypeStrings.get(boatDataKeyFromValue(event.target.value)))
        if (display) {
            console.log("setting data type to: ", event.target.value);
            setDisplay({
                ...display,
                dataType: boatDataKeyFromValue(event.target.value),
            });
        }
    };

    return (
        <Dialog onClose={onCancelEditing} aria-labelledby="user-form-dialog-title" open={!!display} fullWidth maxWidth="sm">
            {
                display &&
                <>
                    <DialogTitle id="user-form-dialog-title">{creating ? 'Add' : 'Modify'} Display</DialogTitle>
                    <DialogContent dividers>
                        <ValidatedTextField
                            fieldErrors={fieldErrors}
                            name="displayType"
                            label="Display Type"
                            fullWidth
                            variant="outlined"
                            value={DisplayTypeStrings.get(display.displayType)}
                            onChange={changeDisplayType}
                            margin="normal"
                            select
                        >
                            <MenuItem disabled>Display Type...</MenuItem>
                            {Array.from(DisplayTypeStrings.entries()).map((m) => (
                                <MenuItem value={m[1]} >{m[1]}</MenuItem>
                            ))}
                        </ValidatedTextField>
                        <ValidatedTextField
                            fieldErrors={fieldErrors}
                            disabled={display.displayType === 0}
                            name="datatype"
                            label="Data Type"
                            fullWidth
                            variant="outlined"
                            value={BoatDataTypeStrings.get(display.dataType)}
                            onChange={changeDataType}
                            margin="normal"
                            select
                        >
                            <MenuItem disabled>Data Type...</MenuItem>
                            {Array.from(BoatDataTypeStrings.entries()).map((m) => (
                                <MenuItem value={m[1]} >{m[1]}</MenuItem>
                            ))}
                        </ValidatedTextField>
                        <ValidatedTextField
                            fieldErrors={fieldErrors}
                            disabled={display.displayType === 0}
                            name="units"
                            label="Units"
                            fullWidth
                            variant="outlined"
                            value={display.units}
                            onChange={updateFormValue}
                            margin="normal"
                            select
                        >
                            <MenuItem disabled>Data Type...</MenuItem>
                            {BoatDataTypeUnits.get(display.dataType)?.map((unit) => (
                                <MenuItem value={unit} >{unit}</MenuItem>
                            ))}
                        </ValidatedTextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={onCancelEditing} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={validateAndDone}
                            color="primary"
                            autoFocus
                        >
                            Done
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    );
};

export default UserForm;
