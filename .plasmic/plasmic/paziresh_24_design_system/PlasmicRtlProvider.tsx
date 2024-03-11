// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: h9Dbk9ygddw7UVEq1NNhKi
// Component: Rg8wZ0CpGCye

import * as React from "react";

import {
  Flex as Flex__,
  MultiChoiceArg,
  PlasmicDataSourceContextProvider as PlasmicDataSourceContextProvider__,
  PlasmicIcon as PlasmicIcon__,
  PlasmicImg as PlasmicImg__,
  PlasmicLink as PlasmicLink__,
  PlasmicPageGuard as PlasmicPageGuard__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  Stack as Stack__,
  StrictProps,
  Trans as Trans__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  generateOnMutateForSpec,
  generateStateOnChangeProp,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  get as $stateGet,
  hasVariant,
  initializeCodeComponentStates,
  initializePlasmicStates,
  makeFragment,
  omit,
  pick,
  renderPlasmicSlot,
  set as $stateSet,
  useCurrentUser,
  useDollarState,
  usePlasmicTranslator,
  useTrigger,
  wrapWithClassName
} from "@plasmicapp/react-web";
import {
  DataCtxReader as DataCtxReader__,
  useDataEnv,
  useGlobalActions
} from "@plasmicapp/react-web/lib/host";

import "@plasmicapp/react-web/lib/plasmic.css";

import projectcss from "./plasmic_paziresh_24_design_system.module.css"; // plasmic-import: h9Dbk9ygddw7UVEq1NNhKi/projectcss
import sty from "./PlasmicRtlProvider.module.css"; // plasmic-import: Rg8wZ0CpGCye/css

createPlasmicElementProxy;

export type PlasmicRtlProvider__VariantMembers = {};
export type PlasmicRtlProvider__VariantsArgs = {};
type VariantPropType = keyof PlasmicRtlProvider__VariantsArgs;
export const PlasmicRtlProvider__VariantProps = new Array<VariantPropType>();

export type PlasmicRtlProvider__ArgsType = {
  children?: React.ReactNode;
};
type ArgPropType = keyof PlasmicRtlProvider__ArgsType;
export const PlasmicRtlProvider__ArgProps = new Array<ArgPropType>("children");

export type PlasmicRtlProvider__OverridesType = {
  root?: Flex__<"div">;
};

export interface DefaultRtlProviderProps {
  children?: React.ReactNode;
  className?: string;
}

const $$ = {};

function PlasmicRtlProvider__RenderFunc(props: {
  variants: PlasmicRtlProvider__VariantsArgs;
  args: PlasmicRtlProvider__ArgsType;
  overrides: PlasmicRtlProvider__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants
  };

  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = useCurrentUser?.() || {};

  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root
      )}
      dir={"rtl"}
    >
      {renderPlasmicSlot({
        defaultContents: null,
        value: args.children
      })}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicRtlProvider__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicRtlProvider__VariantsArgs;
    args?: PlasmicRtlProvider__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicRtlProvider__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicRtlProvider__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicRtlProvider__ArgProps,
          internalVariantPropNames: PlasmicRtlProvider__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicRtlProvider__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicRtlProvider";
  } else {
    func.displayName = `PlasmicRtlProvider.${nodeName}`;
  }
  return func;
}

export const PlasmicRtlProvider = Object.assign(
  // Top-level PlasmicRtlProvider renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements

    // Metadata about props expected for PlasmicRtlProvider
    internalVariantProps: PlasmicRtlProvider__VariantProps,
    internalArgProps: PlasmicRtlProvider__ArgProps
  }
);

export default PlasmicRtlProvider;
/* prettier-ignore-end */
