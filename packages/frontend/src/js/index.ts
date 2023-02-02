import { Api, persons as Persons } from '../.oas/api.js';

const api = new Api();

const mountedModalElem = document.getElementById('mounted-modal');

const unmountModal = () => {
  mountedModalElem.innerHTML = '';
}

const mountModal = (mountNodeElem: DocumentFragment) => {
  const modalElem = document.createElement('pop-modal');
  modalElem.appendChild(mountNodeElem);
  mountedModalElem.appendChild(modalElem);
};

customElements.define('pop-modal',
  class extends HTMLElement {
    private modalCloseBtnElem: HTMLElement;
    constructor() {
      super();
      unmountModal();

      const templateElem = document.getElementById('template-modal') as HTMLTemplateElement;
      const nodeElem = document.importNode(templateElem.content, true);
      this.modalCloseBtnElem = nodeElem.querySelector('#modal-close-btn');

      this.attachShadow({mode: 'open'}).appendChild(nodeElem);
    }
    connectedCallback() {
      this.modalCloseBtnElem.addEventListener('click', unmountModal);
    }
    disconnectedCallback() {
      this.modalCloseBtnElem.removeEventListener('click', unmountModal);
    }
  }
);

const popModalPerson = (personId: number) => async () => {
  const templateElem = document.getElementById('template-person-modal') as HTMLTemplateElement;
  const nodeElem = document.importNode(templateElem.content, true);

  const { data: person } = await api.persons.getPersonById(personId);

  if (person.avatar) {
    nodeElem.querySelector('.avatarSrc').setAttribute('src', person.avatar);
  }

  nodeElem.querySelector('.header').innerHTML = `${person.firstName} ${person.lastName}`;
  nodeElem.querySelector('.email').innerHTML = `${person.email}`;

  if (person.address) {
    nodeElem.querySelector('.streetAddress').innerHTML = person.address.streetAddress;
    nodeElem.querySelector('.zipCode').innerHTML = person.address.zipCode;
    nodeElem.querySelector('.city').innerHTML = person.address.city;
    nodeElem.querySelector('.country').innerHTML = person.address.country;
  }

  mountModal(nodeElem);
};

const popModalCreatePerson = () => {
  const templateElem = document.getElementById('template-create-person-modal') as HTMLTemplateElement;
  const nodeElem = document.importNode(templateElem.content, true);

  const formElem = nodeElem.querySelector('form');

  const addressFieldsElem = formElem.querySelector('.address-fields') as HTMLElement;
  const includeAddressCheckboxElem: HTMLInputElement = nodeElem.querySelector('input[name="includeAddress"]');
  const avatarHolderElem = formElem.querySelector('.avatar-holder') as HTMLElement;
  const avatarImgSrcElem = formElem.querySelector('.avatarSrc') as HTMLImageElement;

  const toggleAddressFields = () => {
    const checked = includeAddressCheckboxElem.checked;
    addressFieldsElem.style.display = checked ? 'block' : 'none';
    const inputElems = addressFieldsElem.querySelectorAll('input');
    for(const inputElem of inputElems) {
      inputElem.required = checked;
    };
  };

  includeAddressCheckboxElem.addEventListener('change', toggleAddressFields);

  const makeAvatarRequest = () => {
    const currClassName = avatarHolderElem.className;
    const busy = currClassName.includes('busy');
    if (!busy) {
      avatarHolderElem.className = 'avatar-holder busy';
      avatarImgSrcElem.src = `https://robohash.org/${Date.now()}`;
      setTimeout(() => {
        avatarHolderElem.className = 'avatar-holder'
      }, 1280);
    }
  };

  avatarHolderElem.addEventListener('click', makeAvatarRequest);

  const createPersonRequest = async (body: Persons.CreatePerson.RequestBody) => {
    await api.persons.createPerson(body);
    unmountModal();
    setTimeout(async () => {
      await personsTable();
    }, 720);
  };

  formElem.addEventListener('submit', (ev: Event) => {
    ev.preventDefault();

    const getInputElem = (namedItem: string) => {
      const { elements } = ev.target as HTMLFormElement;
      return elements.namedItem(namedItem) as HTMLInputElement
    };

    const data: Persons.CreatePerson.RequestBody = {
      firstName: getInputElem('firstName').value,
      lastName: getInputElem('lastName').value,
      email: getInputElem('email').value,
      avatar: avatarImgSrcElem.src,
    };

    if(includeAddressCheckboxElem.checked) {
      data.address = {
        streetAddress: getInputElem('streetAddress').value,
        zipCode: getInputElem('zipCode').value,
        city: getInputElem('city').value,
        country: getInputElem('country').value,
      };
    }

    createPersonRequest(data);
  })

  mountModal(nodeElem);
};

document.getElementById('pop-modal-create-person-btn').addEventListener('click', popModalCreatePerson);

const personsTable = async () => {
  const personsTableElem = document.getElementById('persons-table');

  const { data: persons } = await api.persons.getPersons();

  personsTableElem.innerHTML = '';
  const templateElem = document.getElementById('template-persons-table') as HTMLTemplateElement;
  for (const person of persons) {
    const currNodeElem = document.importNode(templateElem.content, true);
    currNodeElem.querySelector('.person-row').addEventListener('click', popModalPerson(person.personId));

    if (person.avatar) {
      currNodeElem.querySelector('.avatarSrc').setAttribute('src', person.avatar);
    }

    currNodeElem.querySelector('.firstName').innerHTML = person.firstName;
    currNodeElem.querySelector('.lastName').innerHTML = person.lastName;
    currNodeElem.querySelector('.email').innerHTML = person.email;

    document.getElementById('persons-table').appendChild(currNodeElem);
  }
};

personsTable();
