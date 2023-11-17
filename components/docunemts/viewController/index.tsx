import { CheckIcon, Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button, Flex, Popover, Separator, Strong, Text } from "@radix-ui/themes";


export function ViewController({...props}: {
  viewColumnList: { [key: string]: boolean };
  viewColumnCallback: ({...props}: {[key: string]: boolean}) => void
  children: React.ReactNode;
  title: string;
}) {
  const firstUpper = (str: string) => {
    const result = str.length ? str[0].toUpperCase() + str.substring(1) : str;
    return result;
  };
  const { viewColumnList, viewColumnCallback, title, children } = props;
  
  const handleChange = (key: string, visible: boolean) => {
    const update = {[key]: visible};
    viewColumnCallback(update);
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content style={{ width: 150 }}>
        <Flex justify="between" align="center">
          <Text ml="1" mb="2" mt="-1">
            <Strong>{title}</Strong>
          </Text>
          <Popover.Close>
            <Button variant='ghost' color="gray" mt="-3">
              <Cross2Icon />
            </Button>
          </Popover.Close>
        </Flex>
        <Separator size="4" />
        <Flex direction="column" gap="3" mt="3">
          {
            Object.entries(viewColumnList).map(([key, visible]) => {
              return (
                <Button
                  size="3"
                  key={key}
                  highContrast={visible}
                  variant="ghost"
                  color="gray"
                  onClick={()=> {
                    handleChange(key, !visible);
                  }}
                >
                  <Flex gap="1" align="center" style={{ width: 150 }}>
                    <CheckIcon style={{ visibility: visible ? undefined : "collapse" }}/>
                    {firstUpper(key)}
                  </Flex>
                </Button>
              )
            })
          }
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}