import { getPropsWithProperty } from './contentTypesHelper';
/* eslint-disable import/prefer-default-export */
export const getDefinitionData = (definitions, name = null) => {
    const newMap = {};
    definitions.forEach((element) => {
        const definitionId = element.id;
        const definitionName = element.name;

        if (name && definitionName !== name) return;
        const definition = element.schemaDefinition;
        const requiredFields = definition.required;
        const typesOfFields = element.metaDefinition.propertiesConfig;

        const partOfTitleProps = getPropsWithProperty(typesOfFields, 'isTitlePart', [true]);

        Object.keys(typesOfFields).forEach((def) => {
            if (requiredFields.includes(def)) {
                typesOfFields[def].required = true;
            }
        });

        newMap[definitionName] = {
            id: definitionId,
            definitions: typesOfFields,
            partOfTitleProps,
            order: element.metaDefinition.order,
        };
    });
    return newMap;
};

export const prepareRelatedField = (val, relatedObj) => {
    if (!val || !relatedObj) return null;
    return [
        {
            dataUrl: `/api/v1/content/${relatedObj}/${val}`,
            type: 'internal',
        },
    ];
};

export const getRelatedFieldName = (field) => {
    if (!field) return null;
    return field.split('-')[0];
};
