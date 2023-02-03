import { FC, useState } from 'react';

import { Button, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { SectionContent, FormLoader, BlockFormControlLabel, ButtonRow, MessageBox, useLayoutTitle } from '../../components';
import { useRest } from '../../utils';

import * as DisplayApi from './api';
import { createDisplayValidator, Display, DisplaySettings, DisplayType, DisplayTypeStrings } from './types';
import { BoatDataType, BoatDataTypeStrings } from '../boatdata';

import DisplayForm from './DisplayForm'
import { AddToQueue, ArrowDownward, ArrowUpward } from '@mui/icons-material';

const DisplaySettingsForm: FC = () => {
  useLayoutTitle("Display");

  const {
    loadData, saving, data, setData, saveData, errorMessage
  } = useRest<DisplaySettings>({ read: DisplayApi.readDisplaySettings, update: DisplayApi.updateDisplaySettings });

  const [display, setDisplay] = useState<Display>();
  const [creating, setCreating] = useState<boolean>(false);
  const [editIndex, setIndex] = useState<number>();

  const content = () => {
    if (!data) {
      return (<FormLoader onRetry={loadData} errorMessage={errorMessage} />);
    }

    const createDisplay = () => {
      setCreating(true);
      setIndex(-1);
      setDisplay({
        displayType: 0,
        dataType: BoatDataType.None,
      });
    };

    const removeDisplay = (index: number) => {
      setData({
        ...data,
        displays: [...data.displays.slice(0, index), ...data.displays.slice(index + 1)],
      });
    };

    const editDisplay = (index: number) => {
      setCreating(false);
      setIndex(index);
      setDisplay({ ...data.displays[index] });
    };

    const cancelEditingDisplay = () => {
      setDisplay(undefined);
    };

    const doneEditingDisplay = () => {
      if (display && editIndex !== undefined) {
        var toSave = data;
        creating ? toSave.displays.push(display) : toSave.displays[editIndex] = display;
        setData(toSave);
        setDisplay(undefined);
      }
    };

    const onSubmit = async () => {
      await saveData();
    };

    const moveDisplayUp = (index: number) => {
      if (index > 0) {
        var toSave = data.displays;
        toSave.splice(index - 1, 0, toSave.splice(index, 1)[0]);
        setData({
          ...data,
          displays: toSave,
        })
      }
    }

    const moveDisplayDown = (index: number) => {
      if (index < data.displays.length) {
        var toSave = data.displays;
        toSave.splice(index + 1, 0, toSave.splice(index, 1)[0]);
        setData({
          ...data,
          displays: toSave,
        })
      }
    }

    return (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Display Type</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.displays.map((d, index) => (
              <TableRow>
                <TableCell>{DisplayTypeStrings.get(d.displayType)}</TableCell>
                <TableCell>{d.displayType !== DisplayType.Status ? BoatDataTypeStrings.get(d.dataType) : "---"}</TableCell>
                <TableCell>{d.displayType !== DisplayType.Status ? d.units : "---"}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" aria-label="Up" onClick={() => moveDisplayUp(index)}>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton size="small" aria-label="Down" onClick={() => moveDisplayDown(index)}>
                    <ArrowDownward />
                  </IconButton>
                  <IconButton size="small" aria-label="Delete" onClick={() => removeDisplay(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton size="small" aria-label="Edit" onClick={() => editDisplay(index)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {<TableFooter >
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="center" padding="normal">
                <Button startIcon={<AddToQueue />} variant="contained" color="secondary" onClick={createDisplay}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>}
        </Table>
        <ButtonRow mt={2}>
          <Button
            startIcon={<SaveIcon />}
            disabled={saving}
            variant="contained"
            color="primary"
            type="submit"
            onClick={onSubmit}
          >
            Save
          </Button>
        </ButtonRow>
        <DisplayForm
          display={display}
          setDisplay={setDisplay}
          creating={creating}
          onDoneEditing={doneEditingDisplay}
          onCancelEditing={cancelEditingDisplay}
          validator={createDisplayValidator(data.displays, creating)}
        />
      </>
    );
  }

  return (
    <SectionContent title='Manage Displays' titleGutter>
      {content()}
    </SectionContent>
  );
};

export default DisplaySettingsForm;
