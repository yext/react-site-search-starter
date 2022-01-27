const fs = require('fs-extra');
const path = require('path');
const UserError = require('./helpers/errors/usererror');
const { ArgumentMetadata, ArgumentType } = require('./helpers/utils/argumentmetadata');

/**
 * CardCreator represents the `card` custom jambo command.
 * The command creates a new, custom card in the top-level 'cards' directory
 * of a jambo repo.
 */
class CardCreator {
  constructor(jamboConfig) {
    this.config = jamboConfig;
    this._customCardsDir = 'cards';
  }

  /**
   * @returns {string} the alias for the create card command.
   */
  static getAlias() {
    return 'card';
  }

  /**
   * @returns {string} a short description of the create card command.
   */
  static getShortDescription() {
    return 'add a new card for use in the React app';
  }

  /**
   * @returns {Object<string, ArgumentMetadata>} description of each argument for 
   *                                             the create card command, keyed by name
   */
  static args() {
    return {
      'name': new ArgumentMetadata(ArgumentType.STRING, 'name for the new card', true),
      'cardTemplateFilePath': new ArgumentMetadata(ArgumentType.STRING, 'file path of card template', true)
    };
  }

  /**
   * @returns {Object} description of the card command
   */
  static describe(jamboConfig) {
    return {
      displayName: 'Add Card',
      params: {
        name: {
          displayName: 'Card Name',
          required: true,
          type: 'string'
        },
        cardTemplateFilePath: {
          displayName: 'Card Template\'s File Path',
          required: true,
          type: 'string'
        }
      }
    };
  }

  /**
   * Executes the create card command with the provided arguments.
   * 
   * @param {Object<string, string>} args The arguments, keyed by name 
   */
  execute(args) {
    this._create(args.name, args.cardTemplateFilePath);
  }

  /**
   * Creates a new, custom card in the top-level 'Cards' directory. This card
   * will be based off the card template from the given file path.
   * 
   * @param {string} newComponentName The name of the new card. A React component
   *                                  file with this name will be created.
   * @param {string} cardTemplateFilePath The file path of the existing card in which
   *                                      the new one will be based on.
   */
  _create(newComponentName, cardTemplateFilePath) {
    if (!(/^[A-Z][\w_]+$/.test(newComponentName))) {
      throw new UserError(`${newComponentName} is not a valid React component name.`);
    }
    const newCardFilePath = `${this._customCardsDir}/${newComponentName}.tsx`;
    if (fs.existsSync(newCardFilePath)) {
      throw new UserError(`A card component file with this name '${newComponentName}'` 
        + ` already exists in file path: ${newCardFilePath}`);
    }
    if (!fs.existsSync(cardTemplateFilePath)) {
      throw new UserError(`Template for card component does not exist in file path: ${cardTemplateFilePath}`);
    }
    this._createNewComponentFile(newComponentName, newCardFilePath, cardTemplateFilePath);
    this._updateCardRegistry(newComponentName, newCardFilePath);
  }

  /**
   * Creates a new component file in 'cards' directory with modified content from
   * the specified card template file, in which the original component's name is replaced
   * with the new component's name.
   * 
   * @param {string} newComponentName 
   * @param {string} newCardFilePath 
   * @param {string} cardTemplateFilePath 
   */
  _createNewComponentFile(newComponentName, newCardFilePath, cardTemplateFilePath) {
    !fs.existsSync(this._customCardsDir) && fs.mkdirSync(this._customCardsDir);
    const fileContent = fs.readFileSync(cardTemplateFilePath).toString();
    const originalComponentName = path.basename(cardTemplateFilePath, '.tsx');
    const newFileContext = fileContent.replace(new RegExp(originalComponentName, 'g'), newComponentName);
    fs.writeFileSync(newCardFilePath, newFileContext);
  }

  /**
   * Registers new component to the card registry by directly modify content in componentRegistry.ts
   * 
   * @param {string} newComponentName
   * @param {string} newCardFilePath 
   */
  _updateCardRegistry(newComponentName, newCardFilePath) {
    const registryFilePath = './templates/componentRegistry.ts';
    const registryContent = fs.readFileSync(registryFilePath).toString();
    const newCardFilePathWithoutExt = newCardFilePath.substring(0, newCardFilePath.lastIndexOf('.'));
    const newRegistryContent = `import { ${newComponentName} } from "../${newCardFilePathWithoutExt}";\n`
      + registryContent.replace(/(export enum CardTypes {\n)(.*)/gs, `$1\t${newComponentName} = '${newComponentName}',\n$2`)
      + `\nCardRegistry[CardTypes.${newComponentName}] = ${newComponentName}`;
    fs.writeFileSync(registryFilePath, newRegistryContent);
  }
}
module.exports = CardCreator;
