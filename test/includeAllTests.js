const requireContext = require.context('.', true, /\.test\.js$/);
requireContext.keys().forEach(requireContext);
