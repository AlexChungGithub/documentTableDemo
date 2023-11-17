import { CrossCircledIcon, Cross1Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import { ViewController } from "@/components/docunemts/viewController";
import { useState } from "react";

export function FilterBlock({...props}: {
  inputPlaceholder?: string;
  filterInputChangeCallback?: (input: string) => void;
  viewColumnList: { [key: string]: boolean };
  viewColumnCallback: ({...props}: {[key: string]: boolean}) => void
  children: React.ReactNode;
  displayResetButton: boolean;
  onResetButtonClick: VoidFunction;
}) {
  const { inputPlaceholder = '', viewColumnList, viewColumnCallback, filterInputChangeCallback = (input) => {}, children, displayResetButton, onResetButtonClick } = props;
  const [filterText, setFilterText] = useState('');

  const handleTextChange = (text: string) => {
    setFilterText(text);
    filterInputChangeCallback(text);
  }

  return (
    <Flex justify="between" align="center" mt="-1">
      <Flex justify="between" gap="2" align="center">
        <TextField.Root>
          <TextField.Input
            size="2"
            placeholder={inputPlaceholder}
            value={filterText}
            onChange={(e) => { handleTextChange(e.target.value) }}
            style={{
              width: "232px",
            }}
          />
          <TextField.Slot>
            <Button variant="ghost" color="gray" onClick={()=>handleTextChange('')} style={{
              visibility: filterText.length !== 0? undefined : "collapse"
            }}>
              <CrossCircledIcon/>
            </Button>
          </TextField.Slot>
        </TextField.Root>
        <Flex gap="1" align="center" style={{
          maxWidth: 700,
          minHeight: "48px",
          overflow: "auto",
        }}>
          {children}
        </Flex>
        {displayResetButton &&
          <Button
            size="2"
            radius="large"
            color="gray"
            style={{
              boxShadow: 'var(--shadow-2)',
            }}
            onClick={onResetButtonClick}
          >
            Reset<Cross1Icon />
          </Button>
        }
      </Flex>
      <ViewController title='Toggle column' viewColumnList={viewColumnList} viewColumnCallback={viewColumnCallback}>
        <Button
          mr="3"
          variant="outline"
          radius="large"
          size="2"
          style={{ boxShadow: 'var(--shadow-2)' }}
        >
          <MixerHorizontalIcon />
          <Text>View</Text>
        </Button>
      </ViewController>
    </Flex>
  )
}