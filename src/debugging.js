export default {
    reporter: (args) => console.log(args.type + ':', args.name, args.args, args.context)
};
