import { MagnifyingGlassIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Text, Badge, Button, Checkbox, DropdownMenu, Flex, Separator, TextField } from "@radix-ui/themes";
import { forwardRef, useEffect, useState } from "react";


type CheckboxMenuElement = React.ElementRef<typeof Button>;
interface CheckboxMenuProps extends React.ComponentPropsWithoutRef<typeof Button> {
  inputPlaceholder: string;
  itemList: {id: string, name: string }[];
  clearMenu?: number;
  selectedCallback: (selected: (string)[]) => void;
  clearCallback: () => void;
}


const CheckboxMenu = forwardRef<CheckboxMenuElement, CheckboxMenuProps>(
  (props, ref) => {
    const { clearMenu = 0, selectedCallback, clearCallback, title, itemList, inputPlaceholder, children, ...otherProps } = props;
    const [selectedList, setSelectedList] = useState<(string)[]>([]);
    const [itemMatchText, setItemMatchText] = useState('');
    const currentItemList = itemList.filter(data => data.name.toLowerCase().includes(itemMatchText.toLowerCase()));
    
    const clear = () => {
      setSelectedList([]);
      setItemMatchText('');
      clearCallback();
    }

    useEffect(()=>{
      if (clearMenu) {
        setSelectedList([]);
        setItemMatchText('');
      }
    }, [clearMenu]);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="outline"
            size="2"
            radius="large"
            ml="1"
            mr="1"
            style={{
              boxShadow: 'var(--shadow-2)',
            }}
            {...otherProps}
          >
            {children}
            {selectedList.length > 0 && 
              <>
                <Separator orientation="vertical" />
                <Flex gap="1" align="center">
                  {selectedList.length > 2 ? 
                    <Badge size="1">{`${selectedList.length} selected`}</Badge>
                    : 
                    selectedList.map(item => (
                      <Badge size="1" key={item} style={{ maxWidth: 60 }}>
                        <Text style={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow:'hidden',
                        }}>
                          {currentItemList.find(data=>data.id === item)?.name}
                        </Text>
                      </Badge>
                    ))
                  }
                </Flex>
              </>
            }
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon/>
            </TextField.Slot>
            <TextField.Input
              size="2"
              placeholder={inputPlaceholder}
              value={itemMatchText}
              onChange={(e)=>{
                setItemMatchText(e.target.value);
              }}
            />
            <TextField.Slot>
              <Button variant="ghost" color="gray" onClick={()=>setItemMatchText('')} style={{
                visibility: itemMatchText.length !== 0? undefined : "collapse"
              }}>
                <CrossCircledIcon/>
              </Button>
            </TextField.Slot>
          </TextField.Root>

          <DropdownMenu.Separator/>

          <Flex direction="column" gap="2" ml="3" style={{
            maxHeight:"200px",
            overflow: 'overlay',
          }}>
            {
              currentItemList.length && currentItemList.map((item) => {
                return (
                  <Text key={item.id} as="label" size="3">
                    <Flex gap="2" align="center">
                      <Checkbox 
                        checked={selectedList.includes(item.id)}
                        onClick={(e)=> {
                          let selectd: (string)[] = [];
                          const isClicked = !(e.currentTarget.ariaChecked === 'true');
                          if (!isClicked) {
                            selectd = selectedList.filter(data => data !== item.id);
                          } else {
                            selectd = [...selectedList, item.id].sort()
                          }
                          setSelectedList(selectd);
                          selectedCallback(selectd);
                        }}
                      />
                      {item.name}
                    </Flex>
                  </Text>
                )
              }) ||
              <Text ml="5" size="3" color="gray">No results found</Text>
            }
          </Flex>

          {selectedList.length !== 0 && 
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={clear}>
              <Text ml="7" size="3" color="red">Clear filters</Text>
            </DropdownMenu.Item>
          </>}
          
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  }
);

CheckboxMenu.displayName = "CheckboxMenu";
export default CheckboxMenu;