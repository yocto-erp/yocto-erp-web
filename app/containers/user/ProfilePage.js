import React, { useEffect } from "react";
import * as yup from "yup";
import { Form, FormGroup } from "reactstrap";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import useMyForm from "../../libs/hooks/useMyForm";
import { memberApi } from "../../libs/apis/member.api";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../Layout/PageTitle";
import FormGroupInput from "../../components/Form/FormGroupInput";
import messages from "./messages";
import BackButton from "../../components/button/BackButton";
import SubmitButton from "../../components/button/SubmitButton";
import { API_STATE, useApi } from "../../libs/hooks/useApi";
import AvatarChoosen from "./components/AvatarChoosen";
import { cloudAssetUrl } from "../../libs/apis/image.api";
import FormError from "../../components/Form/FormError";
import { selectCompany } from "../../libs/apis/auth.api";
import { set, STORAGE } from "../../libs/utils/storage";
import useUser from "../../libs/hooks/useUser";
import { isArrayHasItem } from "../../utils/util";
import { IconShop } from "../Icon/constants";
import "./ProfilePage.scss";

const schema = yup.object().shape({
  fullName: yup.string().required(),
});

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const {
    onSubmit,
    control,
    register,
    state,
    formState,
    reset,
    setValue,
  } = useMyForm({
    validationSchema: schema,
    form: {
      fullName: "",
      isUpdateAvatar: 0,
      address: "",
      gsm: "",
      avatar: null,
    },
    api: data => memberApi.updateProfile(data),
  });

  const { state: getProfileState, exec } = useApi(memberApi.getProfile);

  useEffect(() => {
    if (getProfileState.status === API_STATE.SUCCESS) {
      const { person, displayName } = getProfileState.resp;
      reset({
        fullName: person.fullName || displayName,
        address: person.address,
        phone: person.gsm,
      });
    }
  }, [getProfileState]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      selectCompany(user.companyId).then(async resp1 => {
        set(STORAGE.JWT, resp1.token);
        await setUser(resp1.user, false);
      });
      toast.success("Cập nhập thông tin thành công");
    }
  }, [state]);

  useEffect(() => {
    exec();
  }, []);

  return (
    <>
      <PageTitle title="Thông tin cá nhân" />
      <Widget className="profile-page">
        <Form onSubmit={onSubmit} noValidate formNoValidate>
          <FormError errors={state.errors} />
          <div className="row">
            <div className="col-md-5">
              <input hidden name="isUpdateAvatar" ref={register} />
              <FormGroup className="text-center">
                <Controller
                  name="avatar"
                  control={control}
                  defaultValue=""
                  render={({ onChange, name, value }, { isDirty, invalid }) => (
                    <AvatarChoosen
                      invalid={invalid}
                      isDirty={isDirty}
                      defaultValue={cloudAssetUrl(getProfileState.resp?.avatar)}
                      value={value}
                      onChange={val => {
                        onChange(val);
                        setValue("isUpdateAvatar", 1);
                      }}
                      name={name}
                    />
                  )}
                />
              </FormGroup>
              {isArrayHasItem(getProfileState.resp?.shops) && (
                <div className="shop-info">
                  <p className="lead mb-0  d-flex align-items-center">
                    <IconShop size={24} className="mr-2" />
                    Thành viên cửa hàng
                  </p>
                  <ol>
                    {getProfileState.resp?.shops.map(t => (
                      <li className="" key={t.id}>
                        {t.name}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            <div className="col-md-7">
              <FormattedMessage {...messages.profilePageFormName}>
                {msg => (
                  <FormGroupInput
                    name="fullName"
                    label={msg}
                    type="text"
                    register={register}
                    error={formState.errors.name}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...messages.profilePageFormPhone}>
                {msg => (
                  <FormGroupInput
                    name="phone"
                    label={msg}
                    type="tel"
                    register={register}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...messages.profilePageFormAddress}>
                {msg => (
                  <FormGroupInput
                    name="address"
                    label={msg}
                    type="text"
                    register={register}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <BackButton className="mr-2" />
          <SubmitButton
            disabled={!formState.isValid || !formState.isDirty}
            isLoading={state.status === API_STATE.LOADING}
          />
        </Form>
      </Widget>
    </>
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
