import { FC } from "react"
import {
  createNewStyle,
  resourceChooseContainerStyle,
  resourceTitleStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Option, Select } from "@illa-design/select"
import { useDispatch, useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Space } from "@illa-design/space"
import { AddIcon, EditableTextWidgetIcon, PenIcon } from "@illa-design/icon"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { configActions } from "@/redux/config/configSlice"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ButtonProps } from "@illa-design/button"

export const ResourceChoose: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const action = useSelector(getSelectedAction)!!
  const resourceList = useSelector(getAllResources)

  return (
    <div css={resourceChooseContainerStyle}>
      <span css={resourceTitleStyle}>{t("resources")}</span>
      <Space direction="horizontal" size="8px">
        <Select
          width="200px"
          value={action.resourceId}
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...action,
                resourceId: value,
              }),
            )
          }}
          addonAfter={{
            buttonProps: {
              variant: "outline",
              colorScheme: "gray",
              leftIcon: <PenIcon />,
            } as ButtonProps,
          }}
        >
          <Option key="create" isSelectOption={false}>
            <Space
              size="8px"
              direction="horizontal"
              align="center"
              css={createNewStyle}
            >
              <AddIcon size="14px" />
              {t("editor.action.panel.option.resource.new")}
            </Space>
          </Option>
          {resourceList.map((item) => {
            return (
              <Option value={item.resourceId} key={item.resourceId}>
                <Space size="8px" direction="horizontal" align="center">
                  {getIconFromResourceType(item.resourceType, "14px")}
                  {item.resourceName}
                </Space>
              </Option>
            )
          })}
        </Select>
        <Select
          width="400px"
          value={action.triggerMode}
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...action,
                triggerMode: value,
              }),
            )
          }}
        >
          <Option value="manually" key="manually">
            {t("editor.action.panel.option.trigger.manually")}
          </Option>
          <Option value="automate" key="automate">
            {t("editor.action.panel.option.trigger.on_change")}
          </Option>
        </Select>
      </Space>
    </div>
  )
}