"use client";
import "./table.css";
import {
  Table,
  Box,
  Flex,
  Button,
  Text,
  Badge,
  Grid,
  Link,
  DropdownMenu,
  Separator,
  Popover,
  Strong,
  Tooltip
} from "@radix-ui/themes";

import {
  CheckCircledIcon,
  DotsHorizontalIcon,
  DotFilledIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";

import { useState } from "react";
import defaultFiles from "./sample-default-template.json";
import CheckboxMenu from "@/components/docunemts/checkboxMenu";
import { SortingMenu } from "@/components/docunemts/sortingMenu";
import { PageController } from "@/components/docunemts/pageController";
import { FilterBlock } from "@/components/docunemts/filterBlock";

import { PageState, usePageReducer } from "./reducer";

interface TemplateInfo {
  id: string;
  category: string;
  title: string;
  tags: string[];
  status: string;
  updateTime: string;
}

// ======fake========
function fakeList() {
  // status menu
  const statusList = [
    "Draft",
    "Created",
    "Todo",
    "In Progress",
    "Done",
    "Published"
  ].map((val) => ({ id: val, name: val }));

  // category menu
  const categoryList = [
    "Proposal",
    "Financial Report",
    "Invoice",
    "ISO",
    "Contract"
  ].map((val, index) => ({ id: index.toString(), name: val }));

  // tag menu
  const tagList = [
    "2023",
    "Hr",
    "Invoice",
    "Financial",
    "Sales",
    "Admin",
    "Contract"
  ].map((val, index) => ({ id: index.toString(), name: val }));

  return { statusList, categoryList, tagList };
}

function filterFiles(variables: PageState) {
  const { filterMenu, filterInput, sort, pageInfo } = variables;
  const { currentPage, rowLimit } = pageInfo;
  const { categoryList, tagList } = fakeList();
  let res: TemplateInfo[] = [];
  res = defaultFiles.filter((data) => {
    const textMatch =
      data.id.includes(filterInput) || data.title.includes(filterInput);
    let checkFilterMenu = true;
    Object.entries(filterMenu).forEach(([type, selectedArr]) => {
      if (selectedArr.length) {
        if (type !== "tag") {
          const tmp = data as any;
          checkFilterMenu = checkFilterMenu && selectedArr.includes(tmp[type]);
        } else {
          const matchItems = data.tags.filter((item) =>
            selectedArr.includes(item)
          );
          checkFilterMenu = checkFilterMenu && matchItems.length > 0;
        }
      }
    });
    return textMatch && checkFilterMenu;
  });
  Object.entries(sort).forEach(([type, sortOpt]) => {
    if (sortOpt !== 0) {
      const key = type === "updated" ? "updateTime" : type;
      res.sort((a, b) => {
        const prev: string = (a as any)[key];
        const next: string = (b as any)[key];
        if (sortOpt == 1) {
          return prev.localeCompare(next);
        } else {
          return next.localeCompare(prev);
        }
      });
    }
  });

  const total = res.length;
  const result = res
    .slice((currentPage - 1) * rowLimit, currentPage * rowLimit)
    .map((val) => {
      return {
        ...val,
        category:
          categoryList.find((data) => data.id === val.category)?.name || "",
        tags: tagList
          .filter((data) => val.tags.includes(data.id))
          .map((data) => data.name)
      };
    });
  return { total, result };
}
//=======fake==============

export default function Page() {
  // fakeList
  const { statusList, categoryList, tagList } = fakeList();

  // reducer
  const [variables, dispatch] = usePageReducer();

  // menu clear
  const [menuClear, setMenuClear] = useState(0);

  // reset filter
  const resettable =
    Object.values(variables.filterMenu).reduce((count: number, item) => {
      return (count += item.length);
    }, 0) !== 0;

  const { total, result: files } = filterFiles(variables);
  if (total !== variables.pageInfo.totalRows) {
    dispatch({ type: "SET_PAGE_INFO", payload: { totalRows: total } });
  }

  return (
    <Grid
      gap="1"
      ml="9"
      mr="9"
      style={{
        border: "1px solid #E4E4E7"
      }}
    >
      <Box
        style={{
          height: "48px",
          borderBottom: "1px solid #E4E4E7"
        }}
      >
        <Box
          style={{
            height: "32px",
            backgroundColor: "#9747FF33"
          }}
        />
      </Box>

      <Box
        style={{
          borderBottom: "1px solid #E4E4E7",
          minHeight: "48px"
        }}
      >
        <FilterBlock
          inputPlaceholder="Filter Templates Title ..."
          filterInputChangeCallback={(text) => {
            dispatch({ type: "FILTER_INPUT", payload: text });
          }}
          viewColumnList={variables.columnVisible}
          viewColumnCallback={(update) => {
            dispatch({ type: "SET_VISIBLE", payload: update });
          }}
          displayResetButton={resettable}
          onResetButtonClick={() => {
            setMenuClear(menuClear + 1);
            dispatch({ type: "CLEAR_MENU", payload: {} });
          }}
        >
          <CheckboxMenu
            inputPlaceholder="Status"
            clearMenu={menuClear}
            itemList={statusList}
            clearCallback={() => {
              dispatch({ type: "FILTER_MENU", payload: { status: [] } });
            }}
            selectedCallback={(selected) => {
              dispatch({ type: "FILTER_MENU", payload: { status: selected } });
            }}
          >
            <PlusCircledIcon />
            Status
          </CheckboxMenu>

          <CheckboxMenu
            inputPlaceholder="Category"
            clearMenu={menuClear}
            itemList={categoryList}
            clearCallback={() => {
              dispatch({ type: "FILTER_MENU", payload: { category: [] } });
            }}
            selectedCallback={(selected) => {
              dispatch({
                type: "FILTER_MENU",
                payload: { category: selected }
              });
            }}
          >
            <PlusCircledIcon />
            Category
          </CheckboxMenu>

          <CheckboxMenu
            inputPlaceholder="Tag"
            clearMenu={menuClear}
            itemList={tagList}
            clearCallback={() => {
              dispatch({ type: "FILTER_MENU", payload: { tag: [] } });
            }}
            selectedCallback={(selected) => {
              dispatch({ type: "FILTER_MENU", payload: { tag: selected } });
            }}
          >
            <PlusCircledIcon />
            Tag
          </CheckboxMenu>
        </FilterBlock>
      </Box>

      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row
              style={{
                height: "40px"
              }}
            >
              <Table.ColumnHeaderCell
                style={{
                  width: "16%",
                  display: variables.columnVisible["category"] ? "" : "none"
                }}
              >
                <SortingMenu
                  sortingCallback={(sortingType) => {
                    dispatch({
                      type: "SET_SORTTING",
                      payload: { category: sortingType }
                    });
                  }}
                  hideCallback={() => {
                    dispatch({
                      type: "SET_VISIBLE",
                      payload: { category: false }
                    });
                  }}
                >
                  Category
                </SortingMenu>
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell
                style={{
                  width: "39%",
                  display: variables.columnVisible["title"] ? "" : "none"
                }}
              >
                <SortingMenu
                  sortingCallback={(sortingType) => {
                    dispatch({
                      type: "SET_SORTTING",
                      payload: { title: sortingType }
                    });
                  }}
                  hideCallback={() => {
                    dispatch({
                      type: "SET_VISIBLE",
                      payload: { title: false }
                    });
                  }}
                >
                  Title
                </SortingMenu>
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell
                style={{
                  width: "16%"
                }}
              ></Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell
                style={{
                  width: "11%",
                  display: variables.columnVisible["status"] ? "" : "none"
                }}
              >
                <SortingMenu
                  sortingCallback={(sortingType) => {
                    dispatch({
                      type: "SET_SORTTING",
                      payload: { status: sortingType }
                    });
                  }}
                  hideCallback={() => {
                    dispatch({
                      type: "SET_VISIBLE",
                      payload: { status: false }
                    });
                  }}
                >
                  Status
                </SortingMenu>
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell
                style={{
                  width: "15%",
                  display: variables.columnVisible["updated"] ? "" : "none"
                }}
              >
                <SortingMenu
                  sortingCallback={(sortingType) => {
                    dispatch({
                      type: "SET_SORTTING",
                      payload: { updated: sortingType }
                    });
                  }}
                  hideCallback={() => {
                    dispatch({
                      type: "SET_VISIBLE",
                      payload: { updated: false }
                    });
                  }}
                >
                  Updated
                </SortingMenu>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                style={{
                  width: "3%"
                }}
              ></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {files.length ? (
              files.map((item) => {
                return (
                  <TableRow
                    categoryList={categoryList}
                    key={item.id}
                    item={item}
                    columnVisible={variables.columnVisible}
                  />
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell colSpan={9} align="center">
                  No Data Found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      <Box style={{ height: "64px" }}>
        <PageController
          pageInfo={variables.pageInfo}
          text={`${variables.pageInfo.totalRows} row(s).`}
          changeCurrentPageCallback={(newPage) => {
            dispatch({
              type: "SET_PAGE_INFO",
              payload: { currentPage: newPage }
            });
          }}
          changeRowLimitCallback={(newLimit) => {
            dispatch({
              type: "SET_PAGE_INFO",
              payload: { rowLimit: newLimit }
            });
          }}
        />
      </Box>
    </Grid>
  );
}

function TableRow({
  ...props
}: {
  item: TemplateInfo;
  columnVisible: { [key: string]: boolean };
  categoryList: { id: string; name: string }[];
}) {
  const { item, columnVisible, categoryList } = props;

  const Status = ({ ...props }: { children: React.ReactNode }) => {
    const { children } = props;
    let result = <></>;

    if (children === "Published") {
      result = (
        <Flex gap="1" align="center">
          <CheckCircledIcon color="green" />
          <Text>{children}</Text>
        </Flex>
      );
    } else {
      result = (
        <Flex gap="1" align="center">
          <DotFilledIcon
            style={{
              width: "20px",
              height: "20px"
            }}
          />
          <Text>{children}</Text>
        </Flex>
      );
    }
    return result;
  };

  return (
    <Table.Row>
      <Table.Cell
        style={{
          display: columnVisible.category ? "" : "none"
        }}
      >
        <Tooltip content={item.category}>
          <Badge variant="outline" radius="large" style={{ maxWidth: 130 }}>
            <Text
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden"
              }}
            >
              {item.category}
            </Text>
          </Badge>
        </Tooltip>
      </Table.Cell>

      <Table.Cell
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: columnVisible.title ? "" : "none"
        }}
      >
        <Tooltip content={item.title}>
          <Link>
            <Text>{item.title}</Text>
          </Link>
        </Tooltip>
      </Table.Cell>

      <Table.Cell>
        <Flex gap="1" align="center">
          <Flex gap="1">
            {item.tags.slice(0, 2).map((tag) => (
              <Tooltip key={tag} content={tag}>
                <Badge variant="outline" radius="full" style={{ maxWidth: 90 }}>
                  <Text
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden"
                    }}
                  >
                    {tag}
                  </Text>
                </Badge>
              </Tooltip>
            ))}
          </Flex>
          {item.tags.length > 2 && (
            <Popover.Root>
              <Tooltip content="All Tags">
                <Popover.Trigger>
                  <Button variant="ghost" mb="-3">
                    <DotsHorizontalIcon />
                  </Button>
                </Popover.Trigger>
              </Tooltip>
              <Popover.Content>
                <Flex align="center" justify="center" mt="-2" mb="1">
                  <Text>
                    <Strong>All Tags</Strong>
                  </Text>
                </Flex>
                <Separator size="4" />
                <Grid columns="3" gap="2" mt="3">
                  {item.tags.map((tag) => (
                    <Flex align="center" key={tag}>
                      <Badge radius="full" variant="outline">
                        {tag}
                      </Badge>
                    </Flex>
                  ))}
                </Grid>
              </Popover.Content>
            </Popover.Root>
          )}
        </Flex>
      </Table.Cell>
      <Table.Cell
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          display: columnVisible.status ? "" : "none"
        }}
      >
        <Status>{item.status}</Status>
      </Table.Cell>

      <Table.Cell
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          display: columnVisible.updated ? "" : "none"
        }}
      >
        <Text>{item.updateTime}</Text>
      </Table.Cell>
      <Table.Cell>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft">
            <DropdownMenu.Item>Edit</DropdownMenu.Item>
            <DropdownMenu.Item>Make a copy</DropdownMenu.Item>
            <DropdownMenu.Item>Faborite</DropdownMenu.Item>

            <DropdownMenu.Separator />

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Category</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                {categoryList.map((category) => (
                  <DropdownMenu.Item key={category.id}>
                    <Flex gap="1" align="center">
                      <DotFilledIcon
                        style={{
                          visibility:
                            category.name === item.category
                              ? undefined
                              : "collapse"
                        }}
                      />
                      {category.name}
                    </Flex>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
  );
}
