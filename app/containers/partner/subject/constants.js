export const SUBJECT_TYPE = {
  PERSONAL: 1,
  COMPANY: 2,
};

export const subjectTypeStr = id => {
  switch (id) {
    case SUBJECT_TYPE.PERSONAL:
      return "PERSONAL";
    default:
      return "COMPANY";
  }
};

export const LIST_SUBJECT_TYPE = [
  { id: SUBJECT_TYPE.PERSONAL, name: subjectTypeStr(SUBJECT_TYPE.PERSONAL) },
  { id: SUBJECT_TYPE.COMPANY, name: subjectTypeStr(SUBJECT_TYPE.COMPANY) },
];

export const mappingSubject = sub => {
  if (sub === null) {
    return sub;
  }
  const { type, company, person, contactPerson, image, remark } = sub;
  const rs = {
    name: "",
    companyName: "",
    type,
    firstName: "",
    lastName: "",
    email: "",
    gsm: "",
    address: "",
    sex: "",
    remark,
    asset: image,
    person: contactPerson,
    tagging: sub.tagging,
  };
  if (type === SUBJECT_TYPE.COMPANY) {
    rs.name = company.name;
    rs.companyName = company.name;
    rs.email = company.email;
    rs.gsm = company.gsm;
    rs.address = company.address;
  } else {
    rs.firstName = person?.firstName;
    rs.lastName = person?.lastName;
    rs.name = `${person?.firstName} ${person?.lastName}`;
    rs.email = person?.email;
    rs.gsm = person?.gsm;
    rs.address = person?.address;
    rs.sex = person?.sex;
  }
  return rs;
};
